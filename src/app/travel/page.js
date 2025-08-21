"use client"

import React from "react"
import {
  Mail, Github, Linkedin, FileText, Menu, X, Globe2
} from "lucide-react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"
import { geoCentroid } from "d3-geo"

// ---------- Personalizable ----------
const ME = {
  name: "Christoffer Tan",
  email: "tanchristoffer@gmail.com",
  github: "https://github.com/christoffertan",
  linkedin: "https://linkedin.com/in/christoffer-tan",
}

// World topojson (CDN)
const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// ---------- Travel data ----------
// Put images in /public/travel/*.jpg or .webp
export const VISITED_CITIES = [
  // -------- Indonesia --------
  { city: "Jakarta", country: "Indonesia", coords: [106.8456, -6.2088], capital: true },
  { city: "Palembang", country: "Indonesia", coords: [104.7458, -2.9761], capital: false },
  { city: "Lampung", country: "Indonesia", coords: [105.2663, -5.45], capital: false },
  { city: "Bandung", country: "Indonesia", coords: [107.6098, -6.9147], capital: false },
  { city: "Semarang", country: "Indonesia", coords: [110.4203, -6.9667], capital: false },
  { city: "Surabaya", country: "Indonesia", coords: [112.7508, -7.2575], capital: false },
  { city: "Bali", country: "Indonesia", coords: [115.1889, -8.4095], capital: false },
  { city: "Lombok", country: "Indonesia", coords: [116.349, -8.65], capital: false },

  // -------- Singapore --------
  { city: "Singapore", country: "Singapore", coords: [103.8198, 1.3521], capital: true },

  // -------- Malaysia --------
  { city: "Penang", country: "Malaysia", coords: [100.3327, 5.4141], capital: false },
  { city: "Kuala Lumpur", country: "Malaysia", coords: [101.6869, 3.139], capital: true },
  { city: "Johor Bahru", country: "Malaysia", coords: [103.7618, 1.4927], capital: false },

  // -------- Japan --------
  { city: "Tokyo", country: "Japan", coords: [139.6917, 35.6895], capital: true },
  { city: "Osaka", country: "Japan", coords: [135.5022, 34.6937], capital: false },
  { city: "Kyoto", country: "Japan", coords: [135.7681, 35.0116], capital: false },

  // -------- China --------
  { city: "Beijing", country: "China", coords: [116.4074, 39.9042], capital: true },
  { city: "Shanghai", country: "China", coords: [121.4737, 31.2304], capital: false },
  { city: "Shenzhen", country: "China", coords: [114.0579, 22.5431], capital: false },

  // -------- Hong Kong --------
  { city: "Kowloon", country: "Hong Kong", coords: [114.1733, 22.3193], capital: false },

  // -------- South Korea --------
  { city: "Seoul", country: "South Korea", coords: [126.978, 37.5665], capital: true },

  // -------- England / UK --------
  { city: "Manchester", country: "United Kingdom", coords: [-2.2426, 53.4808], capital: false },
  { city: "London", country: "United Kingdom", coords: [-0.1276, 51.5072], capital: true },
  { city: "Brighton", country: "United Kingdom", coords: [-0.1364, 50.8225], capital: false },
  { city: "Edinburgh", country: "United Kingdom", coords: [-3.1883, 55.9533], capital: false },

  // -------- Netherlands --------
  { city: "Amsterdam", country: "Netherlands", coords: [4.9041, 52.3676], capital: true },

  // -------- Switzerland --------
  { city: "Zurich", country: "Switzerland", coords: [8.5417, 47.3769], capital: false },
  { city: "Interlaken", country: "Switzerland", coords: [7.866, 46.6863], capital: false },

  // -------- Canada --------
  { city: "Toronto", country: "Canada", coords: [-79.3832, 43.6532], capital: false },
  { city: "Montreal", country: "Canada", coords: [-73.5673, 45.5017], capital: false },

  // -------- Thailand --------
  { city: "Bangkok", country: "Thailand", coords: [100.5018, 13.7563], capital: true },
  { city: "Pattaya", country: "Thailand", coords: [100.869, 12.9236], capital: false },
]

// ---------- Page styles for this route ----------
function TravelStyles() {
  return (
    <style jsx global>{`
      .tooltip {
        pointer-events: none;
        background: rgba(12,13,16,0.96);
        border: 1px solid rgba(255,255,255,0.12);
        padding: 8px;
        border-radius: 10px;
        font-size: 12px;
        color: #e5e7eb;
        box-shadow: 0 8px 22px rgba(0,0,0,0.45);
        max-width: 260px;
      }
      .tooltip img {
        display: block;
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 6px;
      }
      .label-shadow {
        paint-order: stroke;
        stroke: rgba(12,13,16,0.75);
        stroke-width: 3px;
        stroke-linejoin: round;
      }
    `}</style>
  )
}

// ---------- Reusable ----------
function Section({ id, title, children, className = "", compact = false }) {
  const pad = compact ? "py-6 md:py-8" : "py-10 md:py-12"
  return (
    <section
      id={id}
      className={`mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 ${pad} ${className}`}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

// Smooth, JS-driven tooltip that follows cursor without React re-renders
function HoverTooltip({ show, content }) {
  const ref = React.useRef(null)
  const pos = React.useRef({ x: 0, y: 0 })
  const rafId = React.useRef(null)

  React.useEffect(() => {
    function onMove(e) {
      pos.current.x = e.clientX + 14
      pos.current.y = e.clientY + 14
    }
    function loop() {
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      rafId.current = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", onMove)
    rafId.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`tooltip fixed z-50 transition-opacity duration-120 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      {content}
    </div>
  )
}

// ---------- Header (same look as home) ----------
function SiteHeader() {
  const NAV = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Travel", href: "/travel" },
  ]
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c0d10]/75 backdrop-blur supports-[backdrop-filter]:bg-[#0c0d10]/60">
      <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500" />
      <nav className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <a href="/" className="font-bold tracking-wide text-zinc-100">
          <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            CT
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-4 text-sm text-zinc-300">
            {NAV.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            <FileText size={16} /> Resume
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${ME.email}`}
              aria-label="Email"
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <Mail size={18} />
            </a>
            <a
              href={ME.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <Github size={18} />
            </a>
            <a
              href={ME.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

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
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0c0d10]/90 backdrop-blur px-5 sm:px-6 md:px-8 py-3">
          <ul className="flex flex-col gap-2 text-sm text-zinc-300">
            {[{ label: "Home", href: "/" }, ...NAV].map(({ label, href }) => (
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
          </ul>

          <div className="mt-3 flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
            >
              <FileText size={16} /> Resume
            </a>
            <div className="ml-auto flex items-center gap-2">
              <a
                href={`mailto:${ME.email}`}
                aria-label="Email"
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <Mail size={18} />
              </a>
              <a
                href={ME.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <Github size={18} />
              </a>
              <a
                href={ME.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ---------- Page ----------
export default function TravelPage() {
  const [view, setView] = React.useState({ center: [15, 20], zoom: 1 })

  // Tooltip state (no mouse-move re-renders)
  const [tip, setTip] = React.useState({ open: false, kind: null, data: null })
  const tipTimer = React.useRef(null)

  const visitedCountries = React.useMemo(
    () => new Set(VISITED_CITIES.map((c) => c.country)),
    []
  )

  // Maps for O(1) lookups during hover
  const countryCitiesMap = React.useMemo(() => {
    const m = new Map()
    for (const c of VISITED_CITIES) {
      if (!m.has(c.country)) m.set(c.country, [])
      m.get(c.country).push(c)
    }
    return m
  }, [])

  const countryPhotoMap = React.useMemo(() => {
    const m = new Map()
    for (const c of VISITED_CITIES) {
      if (!m.has(c.country) && c.photo) m.set(c.country, c.photo)
    }
    return m
  }, [])

  function showTip(next) {
    clearTimeout(tipTimer.current)
    tipTimer.current = setTimeout(() => setTip({ open: true, ...next }), 70)
  }
  function hideTip() {
    clearTimeout(tipTimer.current)
    setTip({ open: false, kind: null, data: null })
  }

  function flyTo(coords) {
    setView((v) => ({ center: coords, zoom: Math.min(5, Math.max(2, v.zoom + 1.3)) }))
  }

  // Capital = purple, Non-capital = cyan/blue
  function markerColor(capital) {
    return capital ? "#a78bfa" /* purple-400 */ : "#22d3ee" /* cyan-400 */
  }

  // ----- FIX: move tab state & derived lists OUT of JSX callback -----
  const [tab, setTab] = React.useState("country") // 'country' | 'cities'

  const byCountry = React.useMemo(() => {
    return VISITED_CITIES.reduce((acc, cur) => {
      ;(acc[cur.country] ||= []).push(cur)
      return acc
    }, {})
  }, [])

  const countryNames = React.useMemo(() => {
    return Object.keys(byCountry).sort((a, b) => a.localeCompare(b))
  }, [byCountry])

  return (
    <main className="min-h-screen bg-[#0c0d10] text-zinc-100">
      <SiteHeader />

      <Section compact className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
            <Globe2 className="h-5 w-5 text-cyan-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Places I’ve Visited
          </h1>
        </div>
        <p className="text-white/70 max-w-2xl">
          I love travelling and I’ve been to 12 countries so far. Hover on a dot to see the city.
          <br />
          <span className="text-purple-400">Purple</span> means it’s a capital, and{" "}
          <span className="text-blue-400">Blue</span> means it’s another city I’ve explored.
        </p>
      </Section>

      {/* Map */}
      <Section id="map" compact className="pt-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="rounded-xl border border-white/10 bg-[#0c0d10]">
            <ComposableMap
              projection="geoMercator"
              width={980}
              height={420}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup zoom={view.zoom} center={view.center}>
                <Geographies geography={TOPO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties.name
                      const visited = visitedCountries.has(name)
                      const [cx, cy] = geoCentroid(geo)

                      return (
                        <g key={geo.rsmKey}>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => {
                              if (!visited) return
                              showTip({
                                kind: "country",
                                data: {
                                  country: name,
                                  cities: countryCitiesMap.get(name) || [],
                                  photo: countryPhotoMap.get(name) || null,
                                },
                              })
                            }}
                            onMouseLeave={hideTip}
                            style={{
                              default: {
                                fill: visited ? "rgba(34, 211, 238, 0.18)" : "rgba(255,255,255,0.04)",
                                stroke: "rgba(255,255,255,0.12)",
                                outline: "none",
                              },
                              hover: {
                                fill: visited ? "rgba(167,139,250,0.28)" : "rgba(255,255,255,0.08)",
                                stroke: "rgba(255,255,255,0.25)",
                                outline: "none",
                              },
                              pressed: { outline: "none" },
                            }}
                          />

                          {/* label for visited countries */}
                          {visited && (
                            <Marker coordinates={[cx, cy]}>
                              <text
                                textAnchor="middle"
                                className="label-shadow"
                                style={{ fontSize: 10, fill: "rgba(255,255,255,0.85)" }}
                              >
                                {name}
                              </text>
                            </Marker>
                          )}
                        </g>
                      )
                    })
                  }
                </Geographies>

                {/* City markers */}
                {VISITED_CITIES.map((m) => (
                  <Marker key={`${m.city}-${m.country}`} coordinates={m.coords}>
                    <g
                      onMouseEnter={() => {
                        showTip({
                          kind: "city",
                          data: { city: m.city, country: m.country, photo: m.photo || null },
                        })
                      }}
                      onMouseLeave={hideTip}
                      onClick={() => flyTo(m.coords)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* capital = purple, non-capital = cyan/blue */}
                      <circle
                        r={3.6}
                        fill={markerColor(m.capital)}
                        stroke="#ffffff"
                        strokeWidth={1}
                        opacity={0.98}
                      />
                      {/* bigger invisible hit area for easier hover */}
                      <circle r={9} fill="transparent" stroke="transparent" />

                      {/* native browser tooltip (optional, nice fallback) */}
                      <title>{`${m.city}, ${m.country}`}</title>
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>

        {/* Tooltip */}
        <HoverTooltip
          show={tip.open}
          content={
            tip.open && tip.kind === "city" ? (
              <>
                {tip.data?.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tip.data.photo} alt="preview" loading="lazy" />
                )}
                <div className="font-semibold text-white/90">{tip.data?.city}</div>
                <div className="text-white/70">{tip.data?.country}</div>
              </>
            ) : tip.open && tip.kind === "country" ? (
              <>
                {tip.data?.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tip.data.photo} alt="preview" loading="lazy" />
                )}
                <div className="font-semibold text-white/90">{tip.data?.country}</div>
                {tip.data?.cities?.length ? (
                  <div className="mt-1 text-[11px] text-white/60">
                    Cities: {tip.data.cities.map((c) => c.city).join(", ")}
                  </div>
                ) : null}
              </>
            ) : null
          }
        />
      </Section>

      {/* Lists — unified panel with tabs */}
      <Section id="list">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          {/* Header + legend */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Places List
            </h2>

            {/* Tabs */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setTab("country")}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tab === "country" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                By Country
              </button>
              <button
                onClick={() => setTab("cities")}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tab === "cities" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                All Cities
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 flex items-center gap-4 text-[11px] text-white/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400 ring-2 ring-white/20" />
              Capital
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 ring-2 ring-white/20" />
              City
            </span>
          </div>

          {/* Content */}
          {tab === "country" ? (
            /* ----- By Country (collapsibles) ----- */
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {countryNames.map((c) => {
                const cities = byCountry[c].slice().sort((a, b) => a.city.localeCompare(b.city))
                return (
                  <li key={c} className="h-full rounded-xl border border-white/10 bg-white/5">
                    <details className="group h-full [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-white/[0.06] rounded-xl transition-colors">
                        <span className="text-white/90">{c}</span>
                        <span className="shrink-0 grid place-items-center h-6 w-6 rounded-md border border-white/10 bg-white/5 text-white/60 group-open:rotate-180 transition-transform">
                          ▾
                        </span>
                      </summary>
                      <div className="px-3 pb-2 pt-1">
                        <div className="flex flex-wrap gap-2">
                          {cities.map((m) => (
                            <span
                              key={`${m.city}-${m.country}`}
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-white/85 hover:bg-white/[0.08] transition-colors"
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full ring-2 ring-white/20 ${
                                  m.capital ? "bg-purple-400" : "bg-blue-400"
                                }`}
                                aria-hidden
                              />
                              {m.city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </details>
                  </li>
                )
              })}
            </ul>
          ) : (
            /* ----- All Cities A–Z (flat chips) ----- */
            <div className="flex flex-wrap gap-2">
              {VISITED_CITIES.slice()
                .sort((a, b) => a.city.localeCompare(b.city))
                .map((m) => (
                  <span
                    key={`${m.city}-${m.country}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-white/85 hover:bg-white/[0.08] transition-colors"
                    title={`${m.city}, ${m.country}`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ring-2 ring-white/20 ${
                        m.capital ? "bg-purple-400" : "bg-blue-400"
                      }`}
                      aria-hidden
                    />
                    {m.city}
                    <span className="text-white/45">·</span>
                    <span className="text-white/60">{m.country}</span>
                  </span>
                ))}
            </div>
          )}
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0d10]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0c0d10]/70">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8 py-8 text-sm text-white/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {ME.name}. All rights reserved.
            </p>
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

      <TravelStyles />
    </main>
  )
}
