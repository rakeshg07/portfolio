import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Configuration
const PARTICLE_COUNT = 300; // Increased for better visual clusters
const CONNECTION_DISTANCE = 3.5;
const PARTICLE_SIZE = 0.12;
const MAX_VELOCITY = 0.015;
const BURST_FORCE = 0.45;
const BURST_RADIUS = 6.0;

interface ParticleData {
    position: THREE.Vector3;
    baseVelocity: THREE.Vector3;
    velocity: THREE.Vector3;
    scale: number;
    pulse: number;
}

interface Burst {
    position: THREE.Vector3;
    time: number;
    id: number;
}

function Particles() {
    const { viewport, mouse, raycaster, camera } = useThree();
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
    const [bursts, setBursts] = useState<Burst[]>([]);

    // Generate stable random initial positions and velocities
    const particles = useMemo(() => {
        const temp: ParticleData[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * viewport.width * 2;
            const y = (Math.random() - 0.5) * viewport.height * 2;
            const z = (Math.random() - 0.5) * 8;
            const v = new THREE.Vector3(
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005,
                (Math.random() - 0.5) * 0.005
            );
            temp.push({
                position: new THREE.Vector3(x, y, z),
                baseVelocity: v.clone(),
                velocity: v.clone(),
                scale: 1,
                pulse: 0
            });
        }
        return temp;
    }, [viewport]);

    // Dummy for matrix updates
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const handleClick = useCallback((event: THREE.Intersection) => {
        const point = event.point;
        setBursts(prev => [...prev, { position: point.clone(), time: Date.now(), id: Math.random() }]);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const now = Date.now();
        // Clean up old bursts (after 1s)
        const activeBursts = bursts.filter(b => now - b.time < 1000);
        if (activeBursts.length !== bursts.length) setBursts(activeBursts);

        // Update particles
        particles.forEach((particle, i) => {
            // Apply burst forces
            let burstAcceleration = new THREE.Vector3(0, 0, 0);
            let particlePulse = 0;

            activeBursts.forEach(burst => {
                const age = (now - burst.time) / 1000; // 0 to 1
                const dist = particle.position.distanceTo(burst.position);

                if (dist < BURST_RADIUS) {
                    const force = (1 - dist / BURST_RADIUS) * (1 - age) * BURST_FORCE;
                    const dir = particle.position.clone().sub(burst.position).normalize();
                    burstAcceleration.add(dir.multiplyScalar(force));
                    particlePulse = Math.max(particlePulse, force * 2);
                }
            });

            // Physics step
            particle.velocity.lerp(particle.baseVelocity, 0.03); // Return to base speed
            particle.velocity.add(burstAcceleration.multiplyScalar(0.1));
            particle.position.add(particle.velocity);

            // Pulse effect
            particle.pulse = THREE.MathUtils.lerp(particle.pulse, particlePulse, 0.1);
            particle.scale = 1 + particle.pulse;

            // Boundary wrap
            const limitX = viewport.width;
            const limitY = viewport.height;
            if (particle.position.x > limitX) particle.position.x = -limitX;
            if (particle.position.x < -limitX) particle.position.x = limitX;
            if (particle.position.y > limitY) particle.position.y = -limitY;
            if (particle.position.y < -limitY) particle.position.y = limitY;

            // Update instances
            dummy.position.copy(particle.position);
            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;

        // Connections logic
        const linePositions: number[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dist = particles[i].position.distanceTo(particles[j].position);
                if (dist < CONNECTION_DISTANCE) {
                    linePositions.push(
                        particles[i].position.x, particles[i].position.y, particles[i].position.z,
                        particles[j].position.x, particles[j].position.y, particles[j].position.z
                    );
                }
            }
        }

        if (linesGeometryRef.current) {
            linesGeometryRef.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }
    });

    return (
        <group>
            {/* Catch-all interaction plane */}
            <mesh
                visible={false}
                onPointerDown={(e) => handleClick(e)}
                position={[0, 0, 0]}
            >
                <planeGeometry args={[100, 100]} />
            </mesh>

            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, PARTICLE_COUNT]}
            >
                <sphereGeometry args={[PARTICLE_SIZE, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.2} toneMapped={false} />
            </instancedMesh>

            <lineSegments>
                <bufferGeometry ref={linesGeometryRef} />
                <lineBasicMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.06}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020617]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
            >
                <Particles />
                <EffectComposer multisampling={0}>
                    <Bloom
                        luminanceThreshold={0.4}
                        intensity={0.4}
                        levels={8}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
