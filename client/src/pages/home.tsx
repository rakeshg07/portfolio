import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  BookOpen,
  School,
  Briefcase,
  Trophy,
  Award,
  Sparkles,
  Code2,
  Database,
  Brain,
  Wrench,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { KineticToggle } from "@/components/KineticToggle";

const profile = {
  name: "Rakesh G",
  headline: "",
  blurb: "Building through challenges. Growing through code.",
  location: "India",
  socials: {
    github: "https://github.com/rakeshg07",
    linkedin: "https://www.linkedin.com/in/rakeshg07",
    email: "mailto:rakeshg0125@gmail.com",
    emailDisplay: "rakeshg0125@gmail.com",
    resume: "https://drive.google.com/file/d/1lPQSGATZJgs7FzA0TChcy2xuklckxAax/view?usp=sharing",
  },
};

const experiences = [
  {
    id: "excelsoft",
    role: "Software Development Intern",
    company: "Excelsoft Technologies",
    location: "Mysore, India",
    period: "Sep 2026 – Present",
    current: true,
    highlights: [
      "Modernized a legacy AngularJS application to Angular 22, migrating controllers, services, templates, routing, and frontend integrations while preserving core business logic.",
      "Resolved 940+ Angular strict-template and compiler issues, delivering the migrated module with 0 compilation errors and 0 warnings.",
      "Preserved existing REST/API contracts and implemented clean service-based communication between Angular and ASP.NET Web Forms.",
    ],
    stack: ["Angular 22", "TypeScript", "AngularJS", "ASP.NET Web Forms", "REST APIs"],
  },
  {
    id: "wsa",
    role: "MERN Stack Intern",
    company: "WebStack Academy (WSA)",
    location: "Remote / Bengaluru, India",
    period: "Jun 2026 – Jul 2026",
    current: false,
    highlights: [
      "Built Food Genie, an AI-assisted food ordering application using React.js for the frontend and Node.js/Express.js for the backend.",
      "Designed and integrated 8+ RESTful API endpoints covering restaurant listings, menu retrieval, and user authentication.",
      "Implemented secure session handling and optimized MongoDB queries for fast menu data retrieval.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
];

const projects = [
  {
    id: "handy-cricket-league",
    title: "Handy Cricket League",
    featured: true,
    description:
      "A full-stack cricket league management application with a high-performance FastAPI backend and React frontend. Features 10+ RESTful API endpoints for authentication, team & player management, match scheduling, and structured MySQL operations.",
    stack: ["Python", "FastAPI", "React", "MySQL", "REST APIs", "Git"],
    href: "https://github.com/rakeshg07/HANDY-CRICKET-LEAGUE",
  },
  {
    id: "pulmoscan-ai",
    title: "PULMOSCAN-AI",
    featured: true,
    description:
      "A full-stack clinical web application with React + Vite frontend and Flask REST API backend for automated X-ray analysis. Features JWT authentication, role-based access control (Patient, Clinician, Admin), and secure clinical workflows.",
    stack: ["React", "Flask", "PyTorch", "MongoDB", "JWT", "AI/ML"],
    href: "https://github.com/rakeshg07",
  },
  {
    id: "food-genie",
    title: "Food Genie",
    featured: true,
    description:
      "AI-assisted food ordering application developed during MERN stack internship. Implements 8+ RESTful APIs for restaurant listings, menu navigation, automated suggestions, and user authentication.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    href: "https://github.com/rakeshg07",
  },
  {
    id: "vr-academy",
    title: "VR Academy",
    featured: false,
    description:
      "Virtual reality-based educational platform designed to offer tuition support for students, promoting an effective, interactive, and immersive learning environment.",
    stack: ["HTML", "CSS", "JavaScript", "VR", "EdTech"],
    href: "https://github.com/rakeshg07/VR_Academy",
  },
  {
    id: "shiv-clouds",
    title: "Shiv Furniture Cloud",
    featured: false,
    description:
      "Full-stack accounting and inventory management solution for furniture manufacturers. Streamlines sales, purchases, invoicing, payments, and financial reporting.",
    stack: ["JavaScript", "Node.js", "Cloud", "Full-Stack"],
    href: "https://github.com/rakeshg07/shiv-clouds",
  },
  {
    id: "eco-finds",
    title: "Eco-finds",
    featured: false,
    description:
      "An eco-friendly product discovery platform built with modern web technologies, focusing on sustainable shopping, clean design, and environmental consciousness.",
    stack: ["TypeScript", "React", "Tailwind CSS", "E-Commerce"],
    href: "https://github.com/rakeshg07/Eco-finds",
  },
];

const skills = [
  {
    id: "s-frontend",
    title: "Frontend",
    icon: Code2,
    items: ["React.js", "JavaScript", "TypeScript", "Angular 22", "HTML5", "CSS3 / Tailwind"],
  },
  {
    id: "s-backend",
    title: "Backend",
    icon: Database,
    items: ["Python", "FastAPI", "Express.js", "Node.js", "REST API Design & Integration"],
  },
  {
    id: "s-database",
    title: "Databases",
    icon: Database,
    items: ["MongoDB", "MySQL", "SQLite"],
  },
  {
    id: "s-aiml",
    title: "AI / ML",
    icon: Brain,
    items: ["PyTorch", "Transformers", "Hugging Face", "RAG", "FAISS"],
  },
  {
    id: "s-tools",
    title: "Tools & Practices",
    icon: Wrench,
    items: ["Git", "GitHub", "Postman", "Agile / Scrum", "Vite"],
  },
  {
    id: "s-soft",
    title: "Soft Skills & Languages",
    icon: Sparkles,
    items: ["Analytical Thinking", "Problem Solving", "Team Collaboration", "Adaptability", "English", "Kannada", "Telugu"],
  },
];

const achievements = [
  {
    id: "stack-forge",
    title: "Runner-up — Stack Forge Technical Competition",
    organization: "Innovotsava 2026, Maharaja Institute of Technology, Mysore",
    badge: "Runner-up",
    icon: Trophy,
    highlight: true,
    description:
      "Secured 2nd place in the university-wide competitive programming and tech stack showcase during Innovotsava 2026.",
  },
  {
    id: "gdg-hackfest",
    title: "GDG HackFest 2025 (24-Hour Hackathon)",
    organization: "GDG Cloud New Delhi × Agora",
    badge: "24h Hackathon",
    icon: Flame,
    highlight: false,
    description:
      "Participated in an intense 24-hour national hackathon, ideating and prototyping real-time collaborative tech solutions.",
  },
  {
    id: "odoo-hackathon",
    title: "Odoo × NMIT Hackathon 2025",
    organization: "NMIT Bangalore",
    badge: "24h Hackathon",
    icon: Award,
    highlight: false,
    description:
      "Built an innovative enterprise solution in 24 hours competing against top engineering teams across South India.",
  },
  {
    id: "other-hackathons",
    title: "Inter-College Technical Competitions",
    organization: "TechFusion 2025, Hack-Ula (RVCE & NITK), CodeQuezt #24",
    badge: "Participant",
    icon: Sparkles,
    highlight: false,
    description:
      "Active participant in premier hackathons including TechFusion 2025, Hack-Ula (RVCE & NITK), CodeQuezt #24, and competitive coding contests.",
  },
];

const educationData = [
  {
    id: "edu-be",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    school: "Maharaja Institute of Technology, Mysore",
    year: "2023 – 2027",
    score: "CGPA: 8.5 / 10",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "blue",
  },
  {
    id: "edu-puc",
    degree: "Pre-University Course (PCMC)",
    field: "Physics, Chemistry, Mathematics, Computer Science",
    school: "Anikethana PU Science College, Mandya",
    year: "2021 – 2023",
    score: "Percentage: 87.83%",
    icon: <BookOpen className="h-5 w-5" />,
    color: "cyan",
  },
  {
    id: "edu-sslc",
    degree: "Secondary School Leaving Certificate (SSLC)",
    field: "High School Education",
    school: "Vinayaka High School, Taripura",
    year: "2021",
    score: "Percentage: 74.24%",
    icon: <School className="h-5 w-5" />,
    color: "indigo",
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
        className
      )}
      data-testid="card-glass"
    >
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}

function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "mt-4 flex items-center justify-between rounded-2xl px-4 py-3",
            "bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border border-border/80 dark:border-cyan-500/20 shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-colors duration-300"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 overflow-hidden rounded-xl bg-muted/60"
              data-testid="img-avatar"
              aria-hidden="true"
            >
              <img
                src="/profile.jpeg"
                alt={`${profile.name} avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div
                className="font-[650] text-foreground"
                data-testid="text-name-nav"
              >
                {profile.name}
              </div>
              {profile.headline ? (
                <div
                  className="text-xs text-muted-foreground hidden sm:block"
                  data-testid="text-role-nav"
                >
                  {profile.headline}
                </div>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center gap-1 lg:flex lg:ml-auto lg:mr-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm text-muted-foreground",
                  "transition-colors hover:bg-muted/50 hover:text-foreground"
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
                "transition hover:bg-muted"
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
                "transition hover:bg-muted"
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
                "transition hover:bg-muted"
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
  const shouldReduceMotion = useReducedMotion();

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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <NeonPill>
                <span data-testid="text-location">{profile.location}</span>
                <span className="text-muted-foreground/50">/</span>
                <span data-testid="text-availability">Available for work</span>
              </NeonPill>

              <h1
                className="mt-6 hero-title select-text"
                data-testid="text-hero-title"
              >
                RAKESH G
              </h1>

              <p
                className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
                data-testid="text-hero-blurb"
              >
                {profile.blurb}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className={cn(
                    "h-11 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
                    "shadow-[0_0_0_1px_hsl(var(--primary)/0.25)_inset,0_12px_50px_hsl(var(--primary)/0.25)]",
                    "hover:brightness-110"
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
                    "hover:bg-muted font-medium"
                  )}
                  data-testid="button-view-resume"
                >
                  <a
                    href={profile.socials.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" strokeWidth={2} />
                    View Resume
                  </a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-11 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  <a href="#experience">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
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
                <div className="h-64 w-64 md:h-72 md:w-72 overflow-hidden rounded-full border-4 border-primary/20 shadow-[0_4px_30px_hsl(var(--primary)/0.2)]">
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
        <SectionTitle kicker="ABOUT ME" title="Summary & Strengths" />
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <GlassCard className="md:col-span-7">
            <div
              className="space-y-4 text-foreground/80 leading-relaxed"
              data-testid="text-about-body"
            >
              <p>
                I am a Computer Science student at <strong>Maharaja Institute of Technology, Mysore</strong>, with strong foundations in data structures, algorithms, and object-oriented programming, skilled in Python, FastAPI, React, and modern full-stack development.
              </p>
              <p>
                Experienced in building scalable software solutions using Git and agile collaboration practices. At <strong>Excelsoft Technologies</strong>, I modernized enterprise legacy AngularJS applications to Angular 22, resolving over 940+ strict compiler issues with 0 errors and preserving critical REST contracts with ASP.NET backends.
              </p>
              <p>
                I have a strong interest in AI/ML applications, working with PyTorch, Hugging Face Transformers, and RAG architectures, demonstrated through clinical diagnostic platforms like PULMOSCAN-AI and AI-assisted web apps.
              </p>
              <p>
                As an adaptive team player and frequent 24-hour hackathon competitor (GDG HackFest, Odoo × NMIT, Stack Forge runner-up), I thrive in high-tempo engineering environments solving challenging technical problems.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="md:col-span-5">
            <div className="grid gap-3">
              {[
                { label: "Current Role", value: "SDE Intern @ Excelsoft" },
                { label: "Core Stack", value: "Python, FastAPI, React" },
                { label: "Education", value: "B.E. in CSE (2023–2027)" },
                { label: "College", value: "MIT, Mysore (CGPA: 8.5/10)" },
                { label: "Interests", value: "Backend, AI/ML, Cloud" },
                { label: "Status", value: "Open for Opportunities" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="flex items-center justify-between rounded-2xl border border-border bg-muted/60 px-4 py-3"
                  data-testid={`row-about-${i.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="text-sm text-muted-foreground">{i.label}</div>
                  <div className="text-sm font-[650] text-foreground text-right">
                    {i.value}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20"
      data-testid="section-experience"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="EXPERIENCE" title="Professional Work" />

        <div className="mt-8 grid gap-6">
          {experiences.map((exp) => (
            <GlassCard key={exp.id} className="relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-primary">
                        {exp.company} • <span className="text-muted-foreground">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:self-start">
                  {exp.current && (
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Current
                    </span>
                  )}
                  <span className="rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
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

function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20" data-testid="section-skills">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="TECHNICAL SKILLS" title="Technologies & Tools" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <GlassCard key={s.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div
                        className="font-[650] text-foreground"
                        data-testid={`text-skill-title-${s.id}`}
                      >
                        {s.title}
                      </div>
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
                        className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`pill-skill-${s.id}-${i.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
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
        <SectionTitle kicker="PROJECTS" title="Featured Work & Builds" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <GlassCard key={p.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="font-[650] text-foreground text-lg"
                        data-testid={`text-project-title-${p.id}`}
                      >
                        {p.title}
                      </div>
                      {p.featured && (
                        <span className="rounded-full bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          Featured
                        </span>
                      )}
                    </div>
                    <div
                      className="mt-2 text-sm text-muted-foreground line-clamp-4 leading-relaxed"
                      data-testid={`text-project-desc-${p.id}`}
                    >
                      {p.description}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                      data-testid={`pill-project-${p.id}-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium text-primary",
                    "hover:underline transition-colors"
                  )}
                  data-testid={`link-project-${p.id}`}
                >
                  View Code
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-muted/60 hover:bg-muted transition-colors"
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

function Achievements() {
  return (
    <section
      id="achievements"
      className="py-16 md:py-20"
      data-testid="section-achievements"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="HONORS & HACKATHONS" title="Achievements" />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <GlassCard
                key={ach.id}
                className={cn(
                  "flex flex-col justify-between",
                  ach.highlight ? "border-amber-500/30 dark:border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.08)]" : ""
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl border",
                          ach.highlight
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                            : "bg-primary/10 text-primary border-primary/20"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">
                          {ach.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {ach.organization}
                        </p>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0",
                        ach.highlight
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-muted border border-border text-muted-foreground"
                      )}
                    >
                      {ach.badge}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section
      id="education"
      className="py-16 md:py-24"
      data-testid="section-education"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="ACADEMICS" title="Education" />

        <div className="mt-12 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-ml-px" />

          <div className="space-y-10">
            {educationData.map((edu, idx) => (
              <RevealSection
                key={edu.id}
                className={cn(
                  "relative flex flex-col md:flex-row md:items-center",
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-6 z-10 -ml-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)] md:left-1/2 md:top-1/2 md:-mt-1.5" />

                {/* Content Card */}
                <div
                  className={cn(
                    "ml-12 md:ml-0 md:w-1/2",
                    idx % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  )}
                >
                  <GlassCard className="group transition-all duration-300 hover:border-primary/40">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/60 text-primary transition-transform group-hover:scale-105">
                        {edu.icon}
                      </div>
                      <div>
                        <div className="font-mono text-xs font-medium tracking-wider text-primary">
                          {edu.year}
                        </div>
                        <h3 className="mt-0.5 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-semibold text-foreground/90">
                        {edu.field}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.school}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {edu.score}
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Date Label for Desktop */}
                <div
                  className={cn(
                    "hidden md:block md:w-1/2 md:px-12",
                    idx % 2 === 0 ? "text-right" : "text-left"
                  )}
                >
                  <span className="font-mono text-sm tracking-widest text-muted-foreground/60">
                    {edu.year}
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

function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      data-testid="section-contact"
    >
      <div className="mx-auto max-w-6xl px-4">
        <RevealSection>
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-5">
              <SectionTitle
                kicker="CONNECT"
                title="Get In Touch"
                kickerClassName="text-sm text-muted-foreground"
              />
              <p
                className="mt-4 text-muted-foreground leading-relaxed"
                data-testid="text-contact-body"
              >
                I am actively seeking software engineering roles, internships, and collaborative open-source opportunities. Feel free to connect via email or LinkedIn.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={profile.socials.email}
                  className={cn(
                    "glass block rounded-2xl px-4 py-3 text-muted-foreground",
                    "border border-border hover:bg-muted/50 hover:text-foreground transition-colors"
                  )}
                  data-testid="link-email-cta"
                >
                  <span className="text-xs text-muted-foreground block mb-0.5">Direct Email</span>
                  <span className="text-foreground font-medium">{profile.socials.emailDisplay}</span>
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
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center p-4">
                  <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Let's Build Something Together
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-md">
                    Looking for a dedicated software developer proficient in Python, FastAPI, React, and modern full-stack workflows?
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={profile.socials.email}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all"
                    >
                      <Mail className="h-4 w-4" />
                      Send an Email
                    </a>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          <footer
            className="mt-16 border-t border-border pt-8"
            data-testid="footer"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground" data-testid="text-copyright">
                {new Date().getFullYear()} {profile.name} • Built with React, Vite & Tailwind
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  data-testid="link-footer-github"
                >
                  GitHub
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  data-testid="link-footer-linkedin"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.socials.email}
                  className="rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
    <div className="min-h-dvh bg-background text-foreground" data-testid="page-home">
      <TopNav />
      <main className="relative">
        <Hero />
        <RevealSection>
          <About />
        </RevealSection>
        <RevealSection>
          <Experience />
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
        <RevealSection>
          <Achievements />
        </RevealSection>
        <Contact />
      </main>
    </div>
  );
}
