"use client"

import React from "react"
import {
  Github, Linkedin, Mail, ArrowRight, Briefcase, GraduationCap,
  LineChart, BrainCircuit, Code2, Server, FileText, Menu
} from "lucide-react"

/**
 * ChristofferTan.dev — Home (focused build)
 * Sections included: About, Skills, Experience, Projects
 * Theme: Dark (light text on charcoal), cyan→purple accents
 * Tech: React + Tailwind (no external CSS needed)
 *
 * Drop this file into Next.js App Router as app/page.js (JavaScript version).
 * Put assets in /public:
 * - /me.jpg (your single personal photo used in About)
 * - /logos/rbc.svg, /logos/uoft.svg, /logos/bangjamin.svg (or PNGs)
 * - project thumbs at /projects/*.jpg
 */

// ---------- Personalizable content ----------
const ME = {
  name: "Christoffer Tan",
  email: "tanchristoffer@gmail.com",
  github: "https://github.com/christoffertan",
  linkedin: "https://linkedin.com/in/christoffer-tan",
}

// Coarse proficiency scores for a quick visual (0–100)
export const EXPERIENCE = [
  // -------- Professional --------
  {
    type: "professional",
    role: "Data Science Intern",
    org: "Royal Bank of Canada (RBC)",
    time: "Toronto, ON | May 2025 – Aug. 2025",
    bullets: [
      "Designed and implemented an NLP-based pipeline using TF-IDF, spaCy, and fuzzy matching to identify unauthorized IT assets, enhancing compliance and risk controls.",
      "Developed and evaluated statistical models to uncover operational risk trends, supporting data-driven decision-making across business units.",
      "Cleaned, transformed, and analyzed large-scale datasets using SQL and Python, translating insights into executive dashboards to inform strategic actions."
    ],
    tools: ["Python", "SQL", "NLP", "Kibana", "Data Visualization"],
  },
  {
    type: "professional",
    role: "Backend Software Engineer Intern",
    org: "Bang Jamin",
    time: "Jakarta, Indonesia | Jun. 2024 – Aug. 2024",
    bullets: [
      "Built and optimized REST APIs for a car dealer dashboard, serving 1,000+ users using TypeScript and Node.js.",
      "Automated insurance policy generation by integrating external APIs and querying MongoDB, improving efficiency by 60%.",
      "Designed and implemented API tests using Jest and documented APIs using Swagger."
    ],
    tools: ["TypeScript", "Node.js", "MongoDB", "Jest", "Swagger"],
  },

  // -------- Academic --------
  {
    type: "academic",
    role: "Teaching Assistant",
    org: "University of Toronto",
    time: "Toronto, ON | Sept. 2024 – Apr. 2026",
    bullets: [
      "STA130: Intro to Statistical Reasoning and Data Science (Fall 2024, Winter 2026)",
      "STA237: Probability, Statistics and Data Analysis I (Fall 2025)",
      "MAT135: Calculus I (Fall 2025)",
      "MAT136: Calculus II (Winter 2026)"
    ],
    tools: ["R", "Python", "Communication", "Probability", "Mathematics"],
  },
  {
    type: "academic",
    role: "Research Assistant",
    org: "Prof. Meredith Franklin, University of Toronto",
    time: "Toronto, ON | Jun. 2025 – Aug. 2025",
    bullets: [
      "Applied deep learning techniques to satellite image downscaling for aerosol data using ConvLSTM-based VAE models.",
      "Processed seasonal climate datasets (G5NR, MERRA-2), improving the spatial resolution of atmospheric aerosol predictions."
    ],
    tools: ["Python", "TensorFlow", "Deep Learning"],
  },
  {
    type: "academic",
    role: "Research Assistant",
    org: "Prof. Yang Xu, University of Toronto",
    time: "Toronto, ON | Sept. 2025 – Present",
    bullets: [
      "Conducting research on talent perception in sports using NLP techniques.",
      "Building models to analyze large-scale textual data from media sources, focusing on sentiment, framing, and athlete representation."
    ],
    tools: ["Python", "NLP", "Machine Learning", "Sports Analytics"],
  },
]

export const PROJECTS = [
  // -------- Data Science --------
  {
    title: "Predictive Modelling of Bike Share Usage",
    blurb: "Compared five models (LM, GLM, GAM, RF, XGBoost) on 25,000+ Toronto trip records with weather data. Achieved R² = 0.85 and RMSE = 330 using Random Forest, with results shown on an interactive website.",
    tech: ["R", "Machine Learning", "API", "plotly"],
    link: "https://christoffertan.github.io/toronto-bikeshare-analysis/", 
    image: "/projects/bikeshare.png",
    type: "ds",
    date: "2025-04-20",
  },
  {
    title: "Trending Topic Analysis of Twitter",
    blurb: "Processed 10,000 political tweets with tokenization, stemming, and stopword removal. Used LDA topic modeling (coherence = 0.576) and ChatGPT labeling to uncover discourse trends.",
    tech: ["Python", "Pandas", "NumPy", "NLP", "scikit-learn"],
    link: "https://github.com/JanisJ2/jsc270-a4", 
    image: "/projects/twitter.png",
    type: "ds",
    date: "2024-05-01",
  },
  {
    title: "Predicting Food Preferences",
    blurb: "Built four models (Random Forest, Softmax Regression, Naive Bayes Gaussian Discriminant Analysis, and Neural Networks to classify pizza, shawarma, or sushi preferences from 1,600+ survey responses. Achieved 85% test accuracy with an ensemble approach.",
    tech: ["Python", "NumPy", "Scikit-learn", "Neural Networks"],
    link: "/projects/csc311_report.pdf",
    image: "/projects/food.png",
    type: "ds",
    date: "2025-04-15",
  },
  {
    title: "Modeling Fertility Patterns in Portugal",
    blurb: "Applied Poisson and Negative Binomial regression to study how literacy, marriage age, and region affect family size using a 1979 fertility survey. Accounted for confounding and overdispersion with interaction terms, controls, and offsets, finalizing on a Negative Binomial model.",
    tech: ["R", "GLM", "Negative Binomial", "Statistics"],
    link: "/projects/sta303_report.pdf",
    image: "/projects/sta303.png",
    type: "ds",
    date: "2025-02-15",
  },
  {
    title: "Predicting NBA Salaries",
    blurb: "Built linear regression models in R to study how player performance metrics and achievements predict NBA salaries. Enhanced model validity with Box-Cox transformations, automated selection via AIC, VIF checks, and partial F-tests.",
    tech: ["R", "Linear Regression", "Model Diagnostics", "Statistics"],
    link: "https://github.com/JanisJ2/sta302-project/blob/main/report.pdf",
    image: "/projects/nba.png",
    type: "ds",
    date: "2024-12-15",
  },

  // -------- Software Engineering --------
  {
    title: "Full-Stack Online Code Editor",
    blurb: "Built a real-time code editor (10+ languages) with Docker-based execution, syntax highlighting, and JWT-secured auth. Added templates, forking, blogs, and comments with a responsive dark-mode UI.",
    tech: ["TypeScript", "Next.js", "React", "Docker", "SQLite", "TailwindCSS"],
    link: "https://github.com/faraazzz31/scriptorium",
    image: "/projects/scriptorium.png",
    type: "swe",
    date: "2024-08-01",
  },
  {
    title: "Full-Stack Digital Accessibility Platform",
    blurb: "Developed a tool to evaluate web and PDF compliance with WCAG/PDF-UA, integrating Puppeteer, AXE, Cheerio, and Adobe APIs. Reduced testing time by 25% with real-time feedback and batch processing.",
    tech: ["JavaScript", "Node.js", "React", "APIs", "MongoDB", "AWS"],
    link: "https://github.com/csc301-2024-f/project-16-0-barriers-foundation",
    image: "/projects/wcag.jpeg",
    type: "swe",
    date: "2024-06-01",
  },
  {
    title: "Meal Planning & Calorie Tracking App",
    blurb: "Created a recipe-based meal planner with calorie tracking and personalized suggestions. Applied Clean Architecture, SOLID, and MVC principles in full-stack Java development.",
    tech: ["Java", "MVC", "SOLID", "Design Patterns", "Recipe API"],
    link: "https://utoronto-my.sharepoint.com/:p:/g/personal/christoffer_tan_mail_utoronto_ca/Eam8mhJz0FBFl7rrl0asS-IBK3FRpEjQH_aSW3auHqQN8Q?e=yNKf2T",
    image: "/projects/mealmaster.png",
    type: "swe",
    date: "2023-12-01",
  },
  {
    title: "Dr. Mario in MIPS Assembly",
    blurb: "Recreated the classic Dr. Mario game in MIPS Assembly using the Saturn simulator. Implemented mechanics such as gravity, capsule outlines, pause functionality, and animations for smooth gameplay and accurate visuals.",
    tech: ["MIPS Assembly", "Saturn Simulator", "Low-Level Programming"],
    link: "https://github.com/elidle/csc258-drmario",
    image: "/projects/drmario.png",
    type: "swe",
    date: "2024-12-10",
  },
]

// ---------- Small UI helpers ----------
function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </section>
  )
}

function IconWrap({ children }) {
  return (
    <div className="shrink-0 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
      {children}
    </div>
  )
}

function SiteHeader() {
  const NAV = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    // { label: "Blog", href: "/blog" },      // ← add later
    // { label: "Contact", href: "/contact" } // ← add later
  ]

  const [open, setOpen] = React.useState(false)

  // Optional: close mobile menu when route/hash changes
  React.useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c0d10]/75 backdrop-blur supports-[backdrop-filter]:bg-[#0c0d10]/60">
      {/* subtle theme accent on top edge */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500" />

      <nav className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <a href="#about" className="font-bold tracking-wide text-zinc-100">
          <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">CT</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-4 text-sm text-zinc-300">
            {NAV.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative hover:text-white transition-colors"
                >
                  {label}
                  {/* hover underline */}
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full peer-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            <FileText size={16} /> Resume
          </a>

          {/* Socials */}
          <div className="flex items-center gap-2">
            <a href={`mailto:${ME.email}`} aria-label="Email" className="p-2 rounded-lg hover:bg-white/5"><Mail size={18} /></a>
            <a href={ME.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-lg hover:bg-white/5"><Github size={18} /></a>
            <a href={ME.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-white/5"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Mobile toggler */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="border-t border-white/10 bg-[#0c0d10]/90 backdrop-blur px-5 sm:px-6 md:px-8 py-3">
          <ul className="flex flex-col gap-2 text-sm text-zinc-300">
            {NAV.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block w-full rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            {/* Future pages (uncomment later) */}
            {/* <li><a href="/blog" className="block w-full rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white">Blog</a></li>
            <li><a href="/contact" className="block w-full rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white">Contact</a></li> */}
          </ul>

          <div className="mt-3 flex items-center gap-3">
            <a
              href="/Christoffer_Tan_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
            >
              <FileText size={16} /> Resume
            </a>
            <div className="ml-auto flex items-center gap-2">
              <a href={`mailto:${ME.email}`} aria-label="Email" className="p-2 rounded-lg hover:bg-white/5"><Mail size={18} /></a>
              <a href={ME.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-lg hover:bg-white/5"><Github size={18} /></a>
              <a href={ME.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-white/5"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


function ProjectsSection() {
  const [tab, setTab] = React.useState("ds") // <- no TS generic
  const [page, setPage] = React.useState(1)
  const PAGE_SIZE = 4

  // Defensive: ensure PROJECTS exists
  const all = Array.isArray(PROJECTS) ? PROJECTS : []

  // filter + sort by date desc
  const filtered = React.useMemo(() => {
    return all
      .filter(p => p.type === tab)
      .sort((a, b) => {
        const da = new Date(a.date || 0).getTime()
        const db = new Date(b.date || 0).getTime()
        return db - da
      })
  }, [tab, all])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  React.useEffect(() => {
    setPage(1) // reset when switching tab
  }, [tab])

  return (
    <Section id="projects" title="Projects">
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setTab("ds")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "ds"
              ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white"
              : "bg-white/5 text-white/70 hover:text-white"
          }`}
        >
          Data Science
        </button>
        <button
          onClick={() => setTab("swe")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "swe"
              ? "bg-gradient-to-r from-fuchsia-400 to-purple-500 text-white"
              : "bg-white/5 text-white/70 hover:text-white"
          }`}
        >
          Software Engineering
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {visible.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors"
          >
            {p.image ? (
              <img src={p.image} alt={`${p.title} preview`} className="h-44 w-full object-cover" />
            ) : (
              <div className="h-44 w-full bg-white/5" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {p.title}
                </h3>
                {p.date && (
                  <span className="text-[11px] text-white/50 whitespace-nowrap">
                    {new Date(p.date).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/75 mt-1">{p.blurb}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-md bg-white/10 px-2.5 py-1 text-white/80 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm mt-3 text-cyan-300 hover:text-cyan-200"
                >
                  View <ArrowRight size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              page === 1
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/10 text-white/80 hover:bg-white/5"
            }`}
          >
            Prev
          </button>

          <div className="flex items-center gap-2 text-white/70 text-sm">
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1
              const active = n === page
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 rounded-lg border border-white/10 ${
                    active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {n}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              page === totalPages
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/10 text-white/80 hover:bg-white/5"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Section>
  )
}

// ---------- Page ----------
export default function Page() {
  return (
    <main className="min-h-screen bg-[#0c0d10] text-zinc-100">
      {/* Nav (simple for now) */}
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 py-14">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">Hi, I’m</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Christoffer Tan
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-3">I turn messy data into useful products.</p>
        <p className="text-zinc-300 max-w-2xl">Computer Science x Data Science @ UofT.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              {label} <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </section>

      
      <Section id="about" title="About">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Photo with gradient ring */}
          <div className="rounded-2xl p-[3px] bg-gradient-to-tr from-cyan-400 to-purple-500">
            <div className="rounded-[14px] bg-[#0c0d10]">
              <img
                src="/myself.jpg"
                alt="Christoffer Tan"
                width={176} height={176}
                className="block w-44 h-44 rounded-[14px] object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1">
            {/* Intro heading with a softer theme-aligned gradient */}
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
              Hey, I’m Christoffer 👋
            </h3>

            <p className="text-white/80 leading-relaxed mb-3">
              I’m Christoffer, a Computer Science × Data Science student at the University of Toronto, originally from Palembang, Indonesia. 
              I enjoy turning messy data into clean, practical tools and building software that solves real-world problems.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Outside of tech, I’m often on a court playing soccer, basketball, or badminton, and recently I’ve been exploring new sports like padel and pickleball. 
              I like taking on challenges both in and out of tech.
            </p>

            {/* Highlight chips with your theme colors */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-cyan-300 border border-cyan-400/30">
                Data Science
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-fuchsia-300 border border-fuchsia-400/30">
                Software Engineering
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-purple-300 border border-purple-400/30">
                Sports Enthusiast
              </span>
            </div>
          </div>
        </div>
      </Section>



      <Section id="skills" title="Skills">
        {(() => {
          const GROUPS = [
            {
              title: 'Data Science',
              icon: <IconWrap><LineChart className="h-6 w-6 text-cyan-300" /></IconWrap>,
              tools: ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Tidyverse'],
              note: 'Exploratory analysis, statistical modeling, and deriving insights from large-scale datasets.',
              grad: 'from-cyan-300 to-fuchsia-300',
              chipText: 'text-cyan-300',
              chipBorder: 'border-cyan-400/30',
            },
            {
              title: 'Machine Learning',
              icon: <IconWrap><BrainCircuit className="h-6 w-6 text-fuchsia-300" /></IconWrap>,
              tools: ['Scikit-learn', 'XGBoost', 'Random Forests', 'NLP', 'Topic Modeling'],
              note: 'From predictive modeling of bike-share usage to NLP-driven risk item grouping and topic modeling of tweets.',
              grad: 'from-fuchsia-300 to-purple-400',
              chipText: 'text-fuchsia-300',
              chipBorder: 'border-fuchsia-400/30',
            },
            {
              title: 'Software Engineering',
              icon: <IconWrap><Code2 className="h-6 w-6 text-purple-300" /></IconWrap>,
              tools: ['TypeScript', 'Java', 'Node.js', 'Express', 'REST APIs', 'Git'],
              note: 'Developing production-ready APIs, scalable features, and apps with clean architecture principles.',
              grad: 'from-purple-300 to-cyan-300',
              chipText: 'text-purple-300',
              chipBorder: 'border-purple-400/30',
            },
            {
              title: 'Web & Infra',
              icon: <IconWrap><Server className="h-6 w-6 text-cyan-200" /></IconWrap>,
              tools: ['Next.js', 'React', 'Docker', 'MongoDB', 'PostgreSQL', 'AWS'],
              note: 'Building full-stack apps, containerized environments, and cloud-ready infrastructures.',
              grad: 'from-cyan-300 to-purple-400',
              chipText: 'text-cyan-200',
              chipBorder: 'border-cyan-300/30',
            },
          ]

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GROUPS.map((g) => (
                <div
                  key={g.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition-colors"
                >
                  {/* top gradient accent */}
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r ${g.grad}`} />

                  <div className="flex items-center gap-3 mb-4">
                    <div className="shrink-0 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
                      {g.icon}
                    </div>
                    <h3 className={`text-xl font-semibold bg-gradient-to-r ${g.grad} bg-clip-text text-transparent`}>
                      {g.title}
                    </h3>
                  </div>

                  <p className="text-sm text-white/70 mb-3">{g.note}</p>

                  <div className="flex flex-wrap gap-2">
                    {g.tools.map((t) => (
                      <span
                        key={t}
                        className={`text-sm rounded-lg bg-white/10 px-3 py-1 border ${g.chipBorder} ${g.chipText}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* subtle hover glow */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r ${g.grad} mix-blend-overlay`} style={{ maskImage: 'radial-gradient(80% 80% at 50% 0%, black, transparent)' }} />
                </div>
              ))}
            </div>
          )
        })()}
      </Section>

      {/* Experience — timeline with (optional) logos */}
      <Section id="experience" title="Experience">
        {(() => {
          const PRO = EXPERIENCE.filter(e => e.type === "professional")
          const ACAD = EXPERIENCE.filter(e => e.type === "academic")

          function Timeline({ items, grad }) {
            return (
              <ol className="relative ml-3">
                <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${grad}`} />
                {items.map((job, idx) => (
                  <li key={idx} className="relative pl-6 pb-8 last:pb-0">
                    {/* node */}
                    <span
                      className={`absolute left-[-7px] top-2 h-4 w-4 rounded-full bg-gradient-to-r ${grad}`}
                      aria-hidden
                    />
                    {/* card */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <div className="font-semibold text-white/95">{job.role}</div>
                          <div className="text-sm text-white/70">{job.org}</div>
                        </div>
                        <div className="text-sm text-white/60 md:pt-1">{job.time}</div>
                      </div>

                      <ul className="mt-3 list-disc pl-5 text-white/85 marker:text-cyan-300">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="mb-1">{b}</li>
                        ))}
                      </ul>

                      {(job.tools?.length || job.links?.length) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {job.tools?.map((t) => (
                            <span
                              key={t}
                              className="text-xs rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                          {job.links?.map((l) => (
                            <a
                              key={l.label}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-cyan-300 hover:text-cyan-200"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )
          }

          return (
            <div className="space-y-10">
              {/* Professional */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
                    <Briefcase className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Professional Experience
                  </h3>
                </div>
                <Timeline items={PRO} grad="from-cyan-400 to-fuchsia-400" />
              </div>

              {/* Academic */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
                    <GraduationCap className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
                    Academic Experience
                  </h3>
                </div>
                <Timeline items={ACAD} grad="from-fuchsia-400 to-purple-500" />
              </div>
            </div>
          )
        })()}
      </Section>


      {/* Projects — clean grid */}
      <ProjectsSection/>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0d10]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0c0d10]/70">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 py-8 text-sm text-white/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side */}
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {ME.name}. All rights reserved.
            </p>

            {/* Right side links */}
            <div className="flex items-center gap-4">
              <a 
                href={`mailto:${ME.email}`} 
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Mail size={16} /> <span>Email</span>
              </a>
              <a 
                href={ME.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Linkedin size={16} /> <span>LinkedIn</span>
              </a>
              <a 
                href={ME.github} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Github size={16} /> <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
