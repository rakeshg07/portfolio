import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, GraduationCap, BookOpen, School } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { KineticToggle } from "@/components/KineticToggle";

const profile = {
  name: "Rakesh G",
  headline: "CSE Student",
  blurb:
    "Building through challenges. Growing through code.",
  location: "India",
  socials: {
    github: "https://github.com/rakeshg07",
    linkedin: "https://www.linkedin.com/in/rakeshg07",
    email: "mailto:rakeshg0125@gmail.com",
  },
};

const projects = [
  {
    id: "handy-cricket-league",
    title: "Handy Cricket League",
    description:
      "An interactive Hand Cricket game application featuring engaging gameplay, score tracking, and real-time match dynamics.",
    stack: ["HTML", "CSS", "JavaScript", "Game"],
    href: "https://github.com/rakeshg07/HANDY-CRICKET-LEAGUE",
    stars: 0,
  },
  {
    id: "vr-academy",
    title: "VR Academy",
    description:
      "VR Academy is a virtual reality-based educational platform designed to offer tuition support for all students, promoting an effective and interactive learning environment.",
    stack: ["HTML", "CSS", "JavaScript", "VR"],
    href: "https://github.com/rakeshg07/VR_Academy",
    stars: 1,
  },
  {
    id: "shiv-clouds",
    title: "Shiv Furniture Cloud",
    description:
      "Full-stack accounting and inventory management solution for furniture manufacturers. Streamlines sales, purchases, invoicing, payments, and financial reporting.",
    stack: ["JavaScript", "Node.js", "Cloud"],
    href: "https://github.com/rakeshg07/shiv-clouds",
    stars: 0,
  },
  {
    id: "eco-finds",
    title: "Eco-finds",
    description:
      "An eco-friendly product discovery platform built with modern web technologies, focusing on sustainable shopping and environmental consciousness.",
    stack: ["TypeScript", "React", "Tailwind"],
    href: "https://github.com/rakeshg07/Eco-finds",
    stars: 0,
  },
  {
    id: "sky-smart",
    title: "Sky-Smart",
    description:
      "A smart weather and environmental monitoring application with real-time data visualization and intelligent forecasting capabilities.",
    stack: ["TypeScript", "React", "APIs"],
    href: "https://github.com/rakeshg07/Sky-Smart",
    stars: 0,
  },
  {
    id: "mini-project-2026",
    title: "Mini Project 2026",
    description:
      "Latest academic project showcasing full-stack development skills with modern JavaScript frameworks and best practices.",
    stack: ["JavaScript", "React", "Node.js"],
    href: "https://github.com/rakeshg07/Mini-project-2026",
    stars: 0,
  },
];

const skills = [
  {
    id: "s-frontend",
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind", "Accessibility", "Animations"],
  },
  {
    id: "s-backend",
    title: "Backend",
    items: ["Node.js", "REST", "Auth basics"],
  },
  {
    id: "s-database",
    title: "Database",
    items: ["MySQL"],
  },
  {
    id: "s-tools",
    title: "Tools",
    items: ["Git", "Figma", "Vite", "Testing mindset"],
  },
  {
    id: "s-soft",
    title: "Soft Skills",
    items: ["Communication", "Hardworking", "Self-Confidence", "Problem solving"],
  },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function NeonPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
      data-testid="pill-metadata"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_24px_hsl(var(--primary)/0.45)]" />
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  kickerClassName,
}: {
  kicker: string;
  title: string;
  kickerClassName?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p
          className={cn(
            "font-mono text-xs tracking-widest text-muted-foreground",
            kickerClassName
          )}
          data-testid={`text-kicker-${kicker.toLowerCase()}`}
        >
          {kicker}
        </p>
        <h2
          className="mt-2 text-balance font-[650] text-2xl text-foreground md:text-3xl"
          data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <span className="text-neon">{title}</span>
        </h2>
      </div>
      <div className="hidden md:block">
        <div className="h-10 w-10 rounded-full border border-border bg-muted/60" />
      </div>
    </div>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5 md:p-6",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-0.5",
        className,
      )}
      data-testid="card-glass"
    >
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "mt-4 flex items-center justify-between rounded-2xl px-4 py-3",
            "bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border border-border/80 dark:border-cyan-500/20 shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-colors duration-300",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 overflow-hidden rounded-xl bg-muted/60"
              data-testid="img-avatar"
              aria-hidden="true"
            >
              <img src="/profile.jpeg" alt={`${profile.name} avatar`} className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div
                className="font-[650] text-foreground"
                data-testid="text-name-nav"
              >
                {profile.name}
              </div>
              <div
                className="text-xs text-muted-foreground"
                data-testid="text-role-nav"
              >
                {profile.headline}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-1 md:flex md:ml-auto md:mr-4">
            {[
              { label: "About", href: "#about" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Education", href: "#education" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm text-muted-foreground",
                  "transition-colors hover:bg-muted/50 hover:text-foreground",
                )}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/60",
                "transition hover:bg-muted",
              )}
              data-testid="link-github"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/60",
                "transition hover:bg-muted",
              )}
              data-testid="link-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            </a>
            <a
              href={profile.socials.email}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/60",
                "transition hover:bg-muted",
              )}
              data-testid="link-email"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            </a>
            <KineticToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.9 });
  const smy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.9 });

  const rx = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const ry = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mx.set(x);
      my.set(y);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative pt-36 md:pt-48" data-testid="section-hero">
      <div className="rave-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <NeonPill>
                <span data-testid="text-location">{profile.location}</span>
                <span className="text-muted-foreground/50">/</span>
                <span data-testid="text-availability">Available for work</span>
              </NeonPill>

              <h1
                className={cn(
                  "mt-6 font-[700] tracking-[-0.03em]",
                  "text-3xl text-foreground md:text-5xl",
                )}
                data-testid="text-hero-title"
              >
                <span className="block">{profile.name}</span>
                <span className="mt-2 block text-foreground/90">
                  <span className="text-neon">{profile.headline}</span>
                </span>
              </h1>

              <p
                className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
                data-testid="text-hero-blurb"
              >
                {profile.blurb}
              </p>

              <div className="mt-16 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className={cn(
                    "h-11 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                    "shadow-[0_0_0_1px_hsl(var(--primary)/0.25)_inset,0_12px_50px_hsl(var(--primary)/0.25)]",
                    "hover:brightness-110",
                  )}
                >
                  <a href="#projects" data-testid="button-view-projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "h-11 rounded-xl border border-border bg-card dark:bg-muted/40 text-foreground",
                    "hover:bg-muted font-medium",
                  )}
                  data-testid="button-view-resume"
                >
                  <a href="https://drive.google.com/file/d/1lPQSGATZJgs7FzA0TChcy2xuklckxAax/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" strokeWidth={2} />
                    View Resume
                  </a>
                </Button>


              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              ref={ref}
              style={mounted ? { rotateX: rx, rotateY: ry } : undefined}
              className="[transform-style:preserve-3d]"
              data-testid="card-hero-visual"
            >
              {/* Circular Profile Photo */}
              <div className="relative mx-auto w-fit">
                <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-[0_4px_24px_hsl(var(--primary)/0.15)]">
                  <img
                    src="/profile.jpeg"
                    alt={profile.name}
                    className="h-full w-full object-cover"
                    data-testid="img-profile"
                  />
                </div>
                {/* Live indicator */}
                <div
                  className="absolute bottom-4 right-4 h-6 w-6 rounded-full border-4 border-background bg-green-500 shadow-[0_0_12px_hsl(142_76%_36%/0.4)]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="py-16 md:py-20" data-testid="section-about">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="ABOUT" title="Rakesh G" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <GlassCard className="md:col-span-7">
            <div className="space-y-4 text-foreground/80 leading-relaxed" data-testid="text-about-body">
              <p>
                I am a passionate Computer Science Engineering student at Maharaja Institute of Technology, Mysore, with a strong foundation in programming, problem-solving, and modern web development. I enjoy turning ideas into functional, scalable, and user-friendly digital solutions through clean code and thoughtful design.
              </p>
              <p>
                My technical skill set includes C, C++, Java, Python, HTML, and CSS, and I am continuously expanding my knowledge in software engineering, system design, and emerging technologies. I believe in learning by building, improving through challenges, and growing with every project I take on.
              </p>
              <p>
                I have actively participated in national-level hackathons, coding programs, and technical contests, which have strengthened my ability to collaborate in teams, think critically under pressure, and deliver practical solutions in real-world scenarios.
              </p>
              <p>
                Driven by curiosity and consistency, my goal is to contribute to innovative projects, develop reliable and scalable software systems, and grow as a professional who creates meaningful impact through technology.
              </p>
            </div>

          </GlassCard>
          <GlassCard className="md:col-span-5">
            <div className="grid gap-3">
              {[
                { label: "Focus", value: "Full-Stack" },
                { label: "Strength", value: "Polish + clarity" },
                { label: "Education", value: "BE - CSE" },
                { label: "College", value: "MIT, Mysore" },
                { label: "Status", value: "Available for Work" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="flex items-center justify-between rounded-2xl border border-border bg-muted/60 px-4 py-3"
                  data-testid={`row-about-${i.label.toLowerCase()}`}
                >
                  <div className="text-sm text-muted-foreground">{i.label}</div>
                  <div className="text-sm font-[650] text-foreground">{i.value}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}


function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20" data-testid="section-skills">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="SKILLS" title="Tools I reach for" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {skills.map((s, idx) => (
            <GlassCard
              key={s.id}
              className={cn(
                "md:col-span-6 lg:col-span-4",
                // Row 1 (Items 0, 1, 2) uses default lg:col-span-4
                // Row 2 (Items 3, 4) should be centered together
                idx === 3 ? "lg:col-start-3" : "", // Tools starts at Col 3
                idx === 4 ? "lg:col-start-7 lg:col-span-4" : "", // Soft Skills starts at Col 7
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className="font-[650] text-foreground"
                  data-testid={`text-skill-title-${s.id}`}
                >
                  {s.title}
                </div>
                <div
                  className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_24px_hsl(var(--accent)/0.55)]"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
                    data-testid={`pill-skill-${s.id}-${i.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-20"
      data-testid="section-projects"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="PROJECTS" title="Selected builds" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <GlassCard key={p.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div
                    className="font-[650] text-foreground"
                    data-testid={`text-project-title-${p.id}`}
                  >
                    {p.title}
                  </div>
                  <div
                    className="mt-2 text-sm text-muted-foreground line-clamp-3"
                    data-testid={`text-project-desc-${p.id}`}
                  >
                    {p.description}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
                    data-testid={`pill-project-${p.id}-${t.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 text-sm text-muted-foreground",
                    "hover:text-foreground transition-colors",
                  )}
                  data-testid={`link-project-${p.id}`}
                >
                  View on GitHub
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-muted/60"
                  data-testid={`link-project-github-${p.id}`}
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const educationData = [
    {
      id: "edu-be",
      degree: "Bachelor of Engineering",
      field: "Computer Science & Engineering",
      school: "Maharaja Institute of Technology, Mysore",
      year: "2027",
      score: "CGPA: 8.55",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: "edu-puc",
      degree: "Pre-University Course",
      field: "Science Stream",
      school: "Anikethana PU Science College, Mandya",
      year: "2023",
      score: "Percentage: 87.83%",
      icon: <BookOpen className="h-5 w-5" />,
      color: "cyan",
    },
    {
      id: "edu-sslc",
      degree: "SSLC",
      field: "Secondary Education",
      school: "Vinayaka High School, Taripura",
      year: "2021",
      score: "Percentage: 74.24%",
      icon: <School className="h-5 w-5" />,
      color: "indigo",
    },
  ];

  return (
    <section id="education" className="py-20 md:py-32" data-testid="section-education">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="EDUCATION" title="Academic Journey" />

        <div className="mt-16 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-ml-px" />

          <div className="space-y-12">
            {educationData.map((edu, idx) => (
              <RevealSection key={edu.id} className={cn(
                "relative flex flex-col md:flex-row md:items-center",
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                {/* Timeline Dot */}
                <div className="absolute left-4 top-6 z-10 -ml-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)] md:left-1/2 md:top-1/2 md:-mt-1.5" />

                {/* Content Card */}
                <div className={cn(
                  "ml-12 md:ml-0 md:w-1/2",
                  idx % 2 === 0 ? "md:pl-16" : "md:pr-16"
                )}>
                  <GlassCard className="group transition-all duration-500 hover:border-primary/40 hover:shadow-[0_4px_24px_hsl(var(--primary)/0.1)]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/60 text-primary transition-transform group-hover:scale-110">
                        {edu.icon}
                      </div>
                      <div>
                        <div className="font-mono text-xs font-medium tracking-wider text-primary/80">
                          {edu.year}
                        </div>
                        <h3 className="mt-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="text-sm font-semibold text-foreground/90">
                        {edu.field}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.school}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {edu.score}
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Date Label for Desktop (Hidden on Mobile) */}
                <div className={cn(
                  "hidden md:block md:w-1/2 md:px-16",
                  idx % 2 === 0 ? "text-right" : "text-left"
                )}>
                  <span className="font-mono text-sm tracking-widest text-muted-foreground/40">
                    {edu.year.split(" ")[0]}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      data-testid="section-contact"
    >
      <div className="mx-auto max-w-6xl px-4">
        <RevealSection>
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionTitle kicker="CONTACT" title="" kickerClassName="text-sm md:text-base text-muted-foreground" />
              <p
                className="mt-4 text-muted-foreground"
                data-testid="text-contact-body"
              >
                Thank you for visiting my portfolio. If you have an opportunity that aligns with my skills and experience, I'd be pleased to connect. Please reach out via email, and I'll respond within 24 hours.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={profile.socials.email}
                  className={cn(
                    "glass block rounded-2xl px-4 py-3 text-muted-foreground",
                    "border border-border hover:bg-muted/50",
                  )}
                  data-testid="link-email-cta"
                >
                  rakeshg0125@gmail.com
                </a>
                <div
                  className="rounded-2xl border border-border bg-muted/60 p-4"
                  data-testid="card-contact-note"
                >
                  <div className="text-xs text-muted-foreground">Response time</div>
                  <div className="mt-1 font-[650] text-foreground">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <GlassCard>
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Email me</h3>
                  <p className="mt-2 text-muted-foreground">Prefer sending an email? Click the button below to compose a message.</p>
                  <a href={profile.socials.email} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">Send Email</a>
                </div>
              </GlassCard>
            </div>
          </div>

          <footer
            className="mt-14 border-t border-border pt-8"
            data-testid="footer"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground" data-testid="text-copyright">
                {new Date().getFullYear()} {profile.name}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  data-testid="link-footer-github"
                >
                  GitHub
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  data-testid="link-footer-linkedin"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.socials.email}
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  data-testid="link-footer-email"
                >
                  Email
                </a>
              </div>
            </div>
          </footer>
        </RevealSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh bg-background" data-testid="page-home">
      <TopNav />
      <main className="relative">
        <Hero />
        <RevealSection>
          <About />
        </RevealSection>
        <RevealSection>
          <Skills />
        </RevealSection>
        <RevealSection>
          <Projects />
        </RevealSection>
        <RevealSection>
          <Education />
        </RevealSection>
        <Contact />
      </main>
    </div>
  );
}
