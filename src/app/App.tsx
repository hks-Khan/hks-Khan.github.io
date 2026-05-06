import { useState, useEffect } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Devflow",
    subtitle: "Real-time Collaborative IDE",
    description:
      "A browser-based code editor supporting live multi-cursor collaboration via CRDTs, integrated AI autocompletion, and zero-latency deployment previews.",
    tags: ["TypeScript", "React", "WebSocket", "CRDT", "Rust"],
    year: "2024",
    photo: "photo-1555066931-4365d14bab8c",
  },
  {
    id: "02",
    title: "Sentinel",
    subtitle: "AI-Powered Code Review",
    description:
      "Automated pull-request analysis that surfaces security vulnerabilities, anti-patterns, and performance regressions using LLM-based static analysis on diff context.",
    tags: ["Python", "FastAPI", "Claude API", "PostgreSQL", "Docker"],
    year: "2024",
    photo: "photo-1461749280684-dccba630e2f6",
  },
  {
    id: "03",
    title: "Meridian",
    subtitle: "Infrastructure Observability",
    description:
      "Full-stack monitoring platform aggregating Kubernetes cluster metrics, surfacing anomalies in real time, and forecasting resource saturation with time-series ML.",
    tags: ["Go", "React", "InfluxDB", "Kubernetes", "Prometheus"],
    year: "2023",
    photo: "photo-1551288049-bebda4e38f71",
  },
];

const SKILLS = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "WebGL", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Go", "Python", "Rust", "GraphQL"] },
  { category: "Infrastructure", items: ["AWS", "Kubernetes", "Docker", "Terraform", "Prometheus"] },
  { category: "Data", items: ["PostgreSQL", "Redis", "InfluxDB", "Elasticsearch", "Kafka"] },
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "Kakao Corp",
    period: "2023 — Present",
    location: "Seoul",
    desc: "Leading frontend infrastructure for KakaoTalk Web, 53M DAU. Architected a microfrontend system that reduced deploy cadence from weekly to hourly.",
  },
  {
    role: "Full Stack Engineer",
    company: "Naver",
    period: "2021 — 2023",
    location: "Seongnam",
    desc: "Built real-time features for the developer tools suite. Reduced cold-start latency 60% through edge caching and service worker optimization.",
  },
  {
    role: "Software Engineer",
    company: "LINE Corporation",
    period: "2019 — 2021",
    location: "Tokyo",
    desc: "Developed internal tooling and CI/CD pipelines. Automated 80% of release processes, eliminating manual deployment steps across 12 services.",
  },
];

const SLAB = { fontFamily: "'Roboto Slab', serif" };
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const BODY = { fontFamily: "'Inter', sans-serif" };

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={BODY} className="bg-[#EDE8DE] text-[#0A0A0A] overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-14 transition-all duration-300 ${
          scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/8" : "bg-[#0A0A0A]"
        }`}
      >
        <div className="flex items-center justify-between h-full px-8 lg:px-16">
          <span style={MONO} className="text-[11px] tracking-[0.25em] text-white uppercase">
            LSJ.DEV
          </span>
          <nav className="hidden md:flex items-center gap-10">
            {(["WORK", "ABOUT", "CONTACT"] as const).map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={MONO}
                className="text-[10px] tracking-[0.25em] text-white/45 hover:text-white transition-colors duration-200 uppercase"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-screen">

        {/* Left — dark */}
        <div className="bg-[#0A0A0A] w-full lg:w-1/2 flex flex-col justify-between px-8 lg:px-16 pt-28 lg:pt-36 pb-14 lg:pb-20">
          <div>
            <p style={MONO} className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-10">
              Full-Stack Engineer — Seoul, South Korea
            </p>
            <h1
              style={SLAB}
              className="text-[clamp(56px,9.5vw,118px)] font-black leading-[0.88] text-white tracking-tighter uppercase"
            >
              LEE<br />SEO-<br />JUN
            </h1>
          </div>

          <div className="mt-14">
            <p className="text-[#9A9590] text-[15px] lg:text-base leading-[1.75] max-w-xs mb-10">
              I build fast, thoughtful software — from pixel-precise interfaces to distributed backend systems. Currently scaling developer infrastructure at Kakao.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="#work"
                style={MONO}
                className="inline-flex items-center gap-2.5 bg-[#D94B00] text-white px-7 py-3.5 text-[10px] tracking-[0.22em] uppercase hover:bg-[#C24100] transition-colors duration-200"
              >
                Selected Work <ArrowUpRight size={12} strokeWidth={2.5} />
              </a>
              <div className="flex items-center gap-5">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/30 hover:text-white transition-colors duration-200">
                    <Icon size={17} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — accent */}
        <div className="hidden lg:flex bg-[#D94B00] w-full lg:w-1/2 flex-col justify-end px-16 pb-20 pt-36">
          <div className="relative">
            <div className="ml-auto mr-12 w-[360px] h-[400px] border-y-2 border-[#0A0A0A] flex flex-col justify-between py-8">
              <div className="h-px w-full bg-[#0A0A0A]" />
              <div className="h-px w-full bg-[#0A0A0A]" />
              <div className="h-px w-full bg-[#0A0A0A]" />
            </div>
            {/* Stats strip */}
            <div className="flex mt-10 border-t-2 border-[#0A0A0A]">
              {[
                { num: "5", label: "Yrs. Exp." },
                { num: "12+", label: "Projects" },
                { num: "3", label: "Companies" },
              ].map(({ num, label }) => (
                <div key={label} className="flex-1 pt-5 pr-6">
                  <div style={SLAB} className="text-[#0A0A0A] text-3xl font-black leading-none">
                    {num}
                  </div>
                  <div style={MONO} className="text-[10px] tracking-[0.22em] text-[#0A0A0A]/60 uppercase mt-1.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <section id="work" className="bg-[#EDE8DE] px-8 lg:px-16 py-20 lg:py-28">
        <div className="flex items-end justify-between border-t-2 border-[#0A0A0A] pt-8 mb-16">
          <div>
            <div style={MONO} className="text-[10px] tracking-[0.3em] text-[#7A7570] uppercase mb-2.5">
              002 / Selected Work
            </div>
            <h2 style={SLAB} className="text-[clamp(28px,5vw,56px)] font-black text-[#0A0A0A] leading-none uppercase">
              Projects
            </h2>
          </div>
          <span style={MONO} className="hidden lg:block text-[10px] tracking-[0.2em] text-[#7A7570] uppercase pb-1">
            {PROJECTS.length} case studies
          </span>
        </div>

        <div className="divide-y divide-[#0A0A0A]/10">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className="group grid lg:grid-cols-[72px_1fr_280px] gap-6 lg:gap-14 py-10 lg:py-14 cursor-default"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Number */}
              <div style={SLAB} className="text-[#0A0A0A]/15 text-5xl font-black leading-none pt-1 select-none">
                {project.id}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div style={MONO} className="text-[10px] tracking-[0.25em] text-[#D94B00] uppercase mb-3">
                    {project.subtitle} — {project.year}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      style={SLAB}
                      className="text-[clamp(22px,3.5vw,40px)] font-black text-[#0A0A0A] leading-none uppercase group-hover:text-[#D94B00] transition-colors duration-300"
                    >
                      {project.title}
                    </h3>
                    <a
                      href="#"
                      className="shrink-0 mt-1 w-9 h-9 border border-[#0A0A0A]/20 flex items-center justify-center text-[#0A0A0A]/35 hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all duration-200"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <p className="text-[#7A7570] text-sm leading-[1.8] max-w-lg mt-5">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={MONO}
                      className="text-[10px] tracking-[0.15em] text-[#0A0A0A]/55 uppercase border border-[#0A0A0A]/18 px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div
                className={`hidden lg:block h-52 bg-[#D4CFC5] overflow-hidden transition-all duration-500 ${
                  hoveredProject === i ? "opacity-100 grayscale-0" : "opacity-60 grayscale"
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${project.photo}?w=400&h=260&fit=crop&auto=format`}
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CAPABILITIES (dark) ─────────────────────────────── */}
      <section id="about" className="bg-[#0A0A0A] px-8 lg:px-16 py-20 lg:py-28">
        <div className="border-t border-white/10 pt-8 mb-16">
          <div style={MONO} className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2.5">
            003 / Capabilities
          </div>
          <h2 style={SLAB} className="text-[clamp(28px,5vw,56px)] font-black text-white leading-none uppercase">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              className={[
                "py-10",
                i % 2 === 0 ? "lg:pr-16 lg:border-r lg:border-white/8" : "lg:pl-16",
                i < 2 ? "border-b border-white/8 lg:border-b-0 lg:pb-16" : "lg:pt-16",
              ].join(" ")}
            >
              <div style={MONO} className="text-[10px] tracking-[0.3em] text-[#D94B00] uppercase mb-5">
                {group.category}
              </div>
              <div className="flex flex-wrap items-baseline">
                {group.items.map((skill, si) => (
                  <span key={skill} style={SLAB} className="text-white text-xl lg:text-2xl font-bold">
                    {skill}
                    {si < group.items.length - 1 && (
                      <span className="text-white/20 mx-2.5 font-light">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bio strip */}
        <div className="border-t border-white/10 pt-16 mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <div style={MONO} className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">
              About
            </div>
            <p className="text-[#9A9590] text-[15px] leading-[1.8]">
              Based in Seoul, I have spent the last five years building the infrastructure that makes large-scale web products feel effortless. I care about the gap between good code and great product — most of my best work happens there.
            </p>
          </div>
          <div>
            <div style={MONO} className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">
              Education
            </div>
            <div style={SLAB} className="text-white text-xl font-bold">
              Korea University
            </div>
            <div className="text-[#7A7570] text-sm mt-1.5">
              B.S. Computer Science &amp; Engineering, 2019
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <section className="bg-[#EDE8DE] px-8 lg:px-16 py-20 lg:py-28">
        <div className="border-t-2 border-[#0A0A0A] pt-8 mb-16">
          <div style={MONO} className="text-[10px] tracking-[0.3em] text-[#7A7570] uppercase mb-2.5">
            004 / Work History
          </div>
          <h2 style={SLAB} className="text-[clamp(28px,5vw,56px)] font-black text-[#0A0A0A] leading-none uppercase">
            Experience
          </h2>
        </div>

        <div className="divide-y divide-[#0A0A0A]/10">
          {EXPERIENCE.map((exp) => (
            <div
              key={exp.company}
              className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 py-10 lg:py-12"
            >
              <div>
                <div style={SLAB} className="text-[#0A0A0A] text-xl font-bold leading-tight">
                  {exp.company}
                </div>
                <div style={MONO} className="text-[10px] tracking-[0.2em] text-[#7A7570] uppercase mt-2">
                  {exp.period}
                </div>
                <div style={MONO} className="text-[10px] tracking-[0.2em] text-[#7A7570] uppercase mt-1">
                  {exp.location}
                </div>
              </div>
              <div>
                <div style={MONO} className="text-[10px] tracking-[0.22em] text-[#D94B00] uppercase mb-3">
                  {exp.role}
                </div>
                <p className="text-[#7A7570] text-sm leading-[1.8]">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0A0A0A] px-8 lg:px-16 py-24 lg:py-40">
        <div style={MONO} className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-7">
          005 / Contact
        </div>
        <h2
          style={SLAB}
          className="text-[clamp(40px,8vw,100px)] font-black text-white leading-[0.9] uppercase tracking-tighter mb-12"
        >
          {"Let's Build"}<br />Something<br />Together
        </h2>
        <p className="text-[#9A9590] text-[15px] leading-[1.75] max-w-sm mb-12">
          Available for select freelance projects, consulting, and full-time opportunities. I reply within 48 hours.
        </p>
        <a
          href="mailto:seojun@lsj.dev"
          style={MONO}
          className="inline-flex items-center gap-3 text-white border-b-2 border-[#D94B00] pb-1 text-sm tracking-[0.18em] uppercase hover:text-[#D94B00] transition-colors duration-200 group"
        >
          seojun@lsj.dev
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-white/8 px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-white/25 uppercase">
            © 2024 Lee Seo-Jun
          </span>
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-white/18 uppercase">
            Seoul, South Korea
          </span>
        </div>
      </footer>

    </div>
  );
}
