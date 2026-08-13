import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, X, Menu } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — sourced directly from the project brief. Nothing invented.  */
/* ------------------------------------------------------------------ */

const FILTERS = [
  { key: "all", label: "All" },
  { key: "uiux", label: "UI/UX" },
  { key: "web", label: "Web" },
  { key: "datascience", label: "Data Science" },
  { key: "ml", label: "Machine Learning" },
  { key: "dashboard", label: "Dashboard" },
  { key: "management", label: "Management" },
];

const PROJECTS = [
  {
    id: "riasin",
    num: "01",
    title: "Riasin",
    tier: "featured",
    categories: ["uiux"],
    role: "UI/UX Design",
    img: "assets/riasin.png",
    description:
      "A mobile app concept connecting Make-Up Artists with customers — designed end to end, from user flow to a working Figma prototype.",
    tech: ["UI/UX Design", "Figma", "User Flow", "Prototyping"],
    links: [{ label: "Figma Prototype", url: "https://www.figma.com/proto/UTXsduDAAeTcRZW2yGKbnL/Tim-5--Kelas-B-?node-id=266-37" }],
  },
  {
    id: "zubutik",
    num: "02",
    title: "Zu Butik — SCM Dashboard",
    tier: "featured",
    categories: ["dashboard", "management"],
    img: "assets/zubutik.png",
    description:
      "A supply-chain dashboard built for Zu Butik, a batik-fashion UMKM in Makassar, to help manage and monitor its day-to-day business processes.",
    process:
      "Started as a full SCM study — SIPOC mapping, gap & root-cause analysis, and system design (use case, activity, ERD) — before being built out into a working dashboard.",
    tech: ["SIPOC Analysis", "Root-Cause Analysis", "System Design (UML / ERD)", "Dashboard Development"],
    links: [{ label: "Live Demo", url: "https://zu-website.base44.app/" }],
  },
  {
    id: "qira",
    num: "03",
    title: "Qira Technology",
    tier: "featured",
    categories: ["web", "dashboard"],
    img: "assets/qira.png",
    description:
      "An automated bookkeeping app integrated with QRIS payments — recording transactions, generating financial reports, and surfacing business insights on a live dashboard.",
    tech: ["QRIS Integration", "Automatic Transaction Recording", "Financial Reporting", "Dashboard"],
    links: [{ label: "Live Demo", url: "https://qira-technology.base44.app/" }],
  },
  {
    id: "sipawiris",
    num: "04",
    title: "SIPAWIRIS Dashboard",
    tier: "featured",
    categories: ["datascience", "ml", "dashboard"],
    role: "Data Scientist / ML",
    img: "assets/sipawiris.png",
    description:
      "An analytics dashboard built in R Shiny, combining real-time web scraping with sentiment analysis and machine-learning models.",
    tech: ["Web Scraping", "K-Means Clustering", "Random Forest & XGBoost", "Forecasting", "Sentiment Analysis", "R Shiny"],
    links: [{ label: "Live Demo", url: "https://jvpi3u-oh-oh.shinyapps.io/sipawiris-dashboard/" }],
  },
  {
    id: "suara-umkm",
    num: "05",
    title: "SuaraUMKM",
    tier: "featured",
    categories: ["web"],
    role: "Web Developer",
    img: "assets/suara-umkm.png",
    description:
      "Developing SuaraUMKM as a digital platform that provides relevant information and creates opportunities for MSMEs to connect, grow, and access valuable resources.",
    tech: ["Web Design", "Web Development"],
    links: [],
  },
  {
    id: "profas-leadership",
    num: "06",
    title: "Profas Leadership",
    tier: "featured",
    categories: ["web"],
    role: "Web Developer",
    img: "assets/profas-leadership.png",
    description:
      "Developed and implemented a modern, responsive leadership learning platform focused on delivering an engaging and accessible digital learning experience.",
    tech: ["Web Development", "Web Design"],
    links: [{ label: "Live Demo", url: "https://profasleadership.tech/" }],
  },
  {
    id: "helia-rosy",
    num: "07",
    title: "Helia Rosy",
    tier: "featured",
    categories: ["web"],
    role: "Web Developer",
    img: "assets/helia-rosy.png",
    description:
      "Developed a dedicated website with a modern, professional, and user-friendly interface to establish a strong digital presence.",
    tech: ["Web Development", "Web Design"],
    links: [{ label: "Live Demo", url: "https://helia-rosy.vercel.app/" }],
  },
  {
    id: "sanitasi-bioskop",
    num: "08",
    title: "Cinema Sanitation Inspection",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A web platform supporting the inspection and monitoring of cinema sanitation standards.",
    links: [{ label: "Live Demo", url: "https://inspeksi-bioskop-prima-564d3164.base44.app/" }],
  },
  {
    id: "pengelolaan-sampah",
    num: "09",
    title: "Waste Management Platform",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A structured, informative website supporting community waste management.",
    links: [{ label: "Live Demo", url: "https://website-yafi.vercel.app/" }],
  },
  {
    id: "limbah-cair",
    num: "10",
    title: "Household Wastewater Management",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A website supporting household liquid-waste management and monitoring.",
    links: [{ label: "Live Demo", url: "https://website-pengelolaan-limbah-cair-rum.vercel.app/" }],
  },
  {
    id: "makanan-minuman",
    num: "11",
    title: "Food & Beverage Management",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A website focused on the management and monitoring of food & beverage safety.",
    links: [{ label: "Live Demo", url: "https://website-pengelolaan-makanan-dan-min.vercel.app/" }],
  },
  {
    id: "jamban-sehat",
    num: "12",
    title: "Safe Sanitation Access",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A website supporting the provision and monitoring of access to safe household sanitation facilities.",
    links: [{ label: "Live Demo", url: "https://website-penyediaan-akses-jamban-seh.vercel.app/" }],
  },
  {
    id: "sanitasi-rumah-makan",
    num: "13",
    title: "Restaurant Sanitation",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A web application for restaurant sanitation inspection and management.",
    links: [{ label: "Live Demo", url: "https://sanitasi-pro-ebf11323.base44.app/" }],
  },
  {
    id: "aplikasi-inspeksi-bioskop",
    num: "14",
    title: "Cinema Sanitation App",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "A digital app for documenting and inspecting cinema sanitation conditions.",
    links: [{ label: "Live Demo", url: "https://aplikasi-inspeksi-sanitasi-8526f10b.base44.app/" }],
  },
  {
    id: "fanzyy",
    num: "15",
    title: "Fanzyy.id",
    tier: "secondary",
    categories: ["management"],
    role: "Project Manager",
    description:
      "A social-media content brand. Directed as Project Manager — shaping content ideas, guiding execution, and keeping the team's progress on track.",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/fanzyy.id/" },
      { label: "Facebook", url: "https://www.facebook.com/share/164q34D6j5S/" },
    ],
  },
  {
    id: "simulasi-gaya",
    num: "16",
    title: "Simulasi Gaya",
    tier: "secondary",
    categories: ["management"],
    role: "Agency Leader",
    description:
      "A creative agency. Led as Agency Leader — setting content direction, steering project concepts, and making sure targets were actually met.",
    links: [{ label: "Instagram", url: "https://www.instagram.com/simulasigaya/" }],
  },
  {
    id: "simulasi-gaya-website",
    num: "17",
    title: "Simulasi Gaya — Agency Website",
    tier: "compact",
    categories: ["web"],
    role: "Web Developer",
    description: "The digital home built to represent Simulasi Gaya agency online.",
    links: [{ label: "Live Demo", url: "https://agency-simulasi-gaya.vercel.app/" }],
  },
  {
    id: "sentiment-analysis",
    num: "18",
    title: "Sentiment Analysis & Machine Learning",
    tier: "secondary",
    categories: ["datascience", "ml"],
    role: "Data Scientist / ML",
    description:
      "A sentiment-analysis study on a widely-discussed public topic, built with Kelompok 19 — covering data collection, processing, modelling, and interpretation.",
    tech: ["Data Collection", "Data Processing", "Machine Learning", "Sentiment Analysis"],
    links: [{ label: "Project Files", url: "https://drive.google.com/drive/folders/11941MTE3_bm4_TGgAnzjBQ_OZwVpZKms" }],
  },
];

const SKILLS = [
  { group: "Design", items: ["UI/UX", "Figma", "Design Thinking"] },
  { group: "Development", items: ["React", "Web Development", "Responsive Design"] },
  { group: "Data & AI", items: ["Python", "R", "Machine Learning", "Sentiment Analysis", "Data Analysis", "Web Scraping"] },
  { group: "Business & Management", items: ["Digital Business", "Project Management", "Supply Chain Management", "Business Analysis"] },
];

const EXPERIENCE = [
  {
    role: "UI/UX Designer",
    blurb: "Designing user flows and interfaces for real-world problems.",
    projectIds: ["riasin"],
  },
  {
    role: "Web Developer",
    blurb: "Building and shipping functional websites end to end.",
    projectIds: [
      "suara-umkm",
      "profas-leadership",
      "sanitasi-bioskop",
      "pengelolaan-sampah",
      "limbah-cair",
      "makanan-minuman",
      "jamban-sehat",
      "sanitasi-rumah-makan",
      "aplikasi-inspeksi-bioskop",
      "helia-rosy",
      "simulasi-gaya-website",
    ],
  },
  {
    role: "Data Scientist / ML",
    blurb: "From scraping and modelling to dashboards people can actually read.",
    projectIds: ["sentiment-analysis", "sipawiris"],
  },
  {
    role: "Project Manager / Leader",
    blurb: "Directing content, coordinating teams, keeping delivery on track.",
    projectIds: ["fanzyy", "simulasi-gaya"],
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useReveal(threshold = 0.16) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as = "div", style, ...rest }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={"reveal" + (visible ? " is-visible" : "") + (className ? " " + className : "")}
      style={{ transitionDelay: visible ? delay + "ms" : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES — tokens, reset, base type, shared utility classes          */
/* ------------------------------------------------------------------ */

const CSS_TOKENS = `
:root {
  --paper: #F5F6F4;
  --paper-alt: #ECEFEB;
  --surface: #FFFFFF;
  --ink: #14171B;
  --ink-soft: #4B5158;
  --ink-faint: #868D93;
  --line: #DEE2DD;
  --line-strong: #C7CCC6;
  --accent: #0E7C66;
  --accent-dark: #075C4C;
  --accent-soft: #E3EFEB;
  --accent-soft-strong: #CBE3DC;
  --r-sm: 4px;
  --r-md: 10px;
  --r-lg: 18px;
  --shadow-sm: 0 8px 24px -14px rgba(15, 23, 20, 0.28);
  --shadow-md: 0 24px 60px -24px rgba(15, 23, 20, 0.38);
  --font-display: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-text: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, Consolas, "Liberation Mono", monospace;
  --container: 1240px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

.pf-root, .pf-root * , .pf-root *::before, .pf-root *::after { box-sizing: border-box; }

.pf-root {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-text);
  line-height: 1.5;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  .pf-root { scroll-behavior: auto; }
}
.pf-root h1, .pf-root h2, .pf-root h3, .pf-root h4 {
  font-family: var(--font-display);
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.pf-root p { margin: 0; }
.pf-root a { color: inherit; text-decoration: none; }
.pf-root button { font-family: inherit; cursor: pointer; }
.pf-root ul { margin: 0; padding: 0; list-style: none; }
.pf-root img { max-width: 100%; display: block; }

.pf-container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}

.pf-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-dark);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.pf-eyebrow::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  display: inline-block;
  flex: none;
}

.pf-section { padding: clamp(64px, 10vw, 128px) 0; position: relative; }
.pf-section-alt { background: var(--paper-alt); }

.pf-section-head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: clamp(40px, 6vw, 72px);
  max-width: 640px;
}
.pf-section-head h2 { font-size: clamp(1.75rem, 3.4vw, 2.5rem); }
.pf-section-head p { color: var(--ink-soft); font-size: 1.05rem; line-height: 1.6; }

.pf-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 26px;
  border-radius: var(--r-sm);
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid transparent;
  transition: transform 0.35s var(--ease), background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
}
.pf-btn-primary { background: var(--ink); color: var(--paper); }
.pf-btn-primary:hover { background: var(--accent-dark); transform: translateY(-2px); }
.pf-btn-ghost { background: transparent; color: var(--ink); border-color: var(--line-strong); }
.pf-btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }
.pf-btn:focus-visible, .pf-link-arrow:focus-visible, .pf-tab:focus-visible, .pf-card:focus-visible, .pf-modal-close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.pf-link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink);
  background: none;
  border: none;
  border-bottom: 1px solid var(--line-strong);
  padding: 0 0 2px;
  margin: 0;
  transition: border-color 0.3s ease, color 0.3s ease, gap 0.3s ease;
}
.pf-link-arrow:hover { color: var(--accent-dark); border-color: var(--accent); gap: 10px; }
.pf-link-arrow svg { width: 16px; height: 16px; transition: transform 0.3s ease; }
.pf-link-arrow:hover svg { transform: translate(2px, -2px); }

.pf-tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: var(--r-sm);
  background: var(--accent-soft);
  color: var(--accent-dark);
  white-space: nowrap;
  display: inline-block;
}
.pf-tag-outline { background: transparent; border: 1px solid var(--line-strong); color: var(--ink-soft); }

.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

.pf-idx { font-family: var(--font-mono); font-size: 0.8rem; color: var(--ink-faint); letter-spacing: 0.05em; }
`;

const CSS_LAYOUT = `
.pf-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 60;
  padding: 20px clamp(20px,5vw,64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s ease, border-color 0.4s ease, padding 0.4s ease;
  border-bottom: 1px solid transparent;
}
.pf-nav.is-scrolled {
  background: rgba(245, 246, 244, 0.86);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
  padding-top: 14px;
  padding-bottom: 14px;
}
.pf-nav-brand { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px; }
.pf-nav-brand-mark {
  width: 30px; height: 30px;
  border-radius: var(--r-sm);
  background: var(--ink);
  color: var(--paper);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.85rem;
}
.pf-nav-links { display: flex; align-items: center; gap: 36px; }
.pf-nav-links a { font-size: 0.92rem; font-weight: 500; color: var(--ink-soft); position: relative; padding-bottom: 4px; transition: color 0.25s ease; }
.pf-nav-links a:hover { color: var(--ink); }
.pf-nav-links a::after { content: ""; position: absolute; left: 0; bottom: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.3s var(--ease); }
.pf-nav-links a:hover::after { width: 100%; }
.pf-nav-actions { display: flex; align-items: center; gap: 18px; }
.pf-nav-toggle { display: none; background: none; border: none; color: var(--ink); padding: 6px; }
.pf-nav-mobile {
  position: fixed; inset: 0; background: var(--paper); z-index: 59;
  display: flex; flex-direction: column; justify-content: center; gap: 28px;
  padding: 32px clamp(20px,8vw,64px);
  transform: translateY(-100%);
  transition: transform 0.45s var(--ease);
}
.pf-nav-mobile.is-open { transform: translateY(0); }
.pf-nav-mobile a { font-family: var(--font-display); font-size: 2rem; font-weight: 600; }

.pf-hero { padding: clamp(140px,20vw,200px) 0 clamp(64px,8vw,96px); position: relative; }
.pf-hero-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: clamp(32px, 6vw, 80px); align-items: start; }
.pf-hero-copy { display: flex; flex-direction: column; gap: 26px; }
.pf-hero-title { font-size: clamp(2.5rem, 5.4vw, 4.5rem); line-height: 1.04; letter-spacing: -0.03em; max-width: 15ch; }
.pf-hero-sub { font-size: clamp(1.05rem, 1.4vw, 1.2rem); color: var(--ink-soft); max-width: 46ch; line-height: 1.6; }
.pf-hero-cta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.pf-hero-positioning { display: flex; flex-wrap: wrap; gap: 10px 18px; padding-top: 8px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); }

.pf-hero-panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; box-shadow: var(--shadow-sm); }
.pf-hero-panel-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 18px; margin-bottom: 18px; border-bottom: 1px solid var(--line); }
.pf-mono-label { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); }
.pf-hero-panel-list { display: flex; flex-direction: column; gap: 4px; }
.pf-hero-panel-list li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px dashed var(--line); font-size: 0.92rem; font-weight: 500; }
.pf-hero-panel-list li:last-child { border-bottom: none; }
.pf-hero-panel-list .pf-idx { flex: none; width: 22px; }
.pf-hero-panel-list .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-soft-strong); flex: none; margin-left: auto; }
.pf-hero-panel-list li.is-live .dot { background: var(--accent); animation: pulse 2.4s ease-in-out infinite; }
.pf-hero-panel-foot { display: flex; gap: 24px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--line); }
.pf-hero-panel-foot div { display: flex; flex-direction: column; gap: 2px; }
.pf-hero-panel-foot strong { font-family: var(--font-display); font-size: 1.5rem; }
.pf-hero-panel-foot span { font-size: 0.72rem; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.06em; }

.pf-hero-scroll-cue { display: flex; align-items: center; gap: 10px; margin-top: clamp(48px,8vw,88px); font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-faint); }
.pf-hero-scroll-cue::after { content: ""; width: 40px; height: 1px; background: var(--line-strong); }

@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.5); } }

.pf-about-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(32px,6vw,72px); }
.pf-about-lead h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); margin-top: 14px; line-height: 1.18; }
.pf-about-body { display: flex; flex-direction: column; gap: 32px; }
.pf-about-p { font-size: 1.1rem; color: var(--ink-soft); line-height: 1.65; max-width: 56ch; }
.pf-about-grid-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; }
.pf-about-card { background: var(--surface); padding: 26px; display: flex; flex-direction: column; gap: 10px; }
.pf-about-card h3 { font-size: 1.05rem; }
.pf-about-card p { color: var(--ink-soft); font-size: 0.92rem; line-height: 1.55; }

.pf-skills-list { display: flex; flex-direction: column; }
.pf-skills-row { display: grid; grid-template-columns: 260px 1fr; gap: 24px; align-items: center; padding: 22px 0; border-top: 1px solid var(--line); }
.pf-skills-row:last-child { border-bottom: 1px solid var(--line); }
.pf-skills-row-label { display: flex; align-items: center; gap: 14px; }
.pf-skills-row-label h3 { font-size: 1.15rem; }
.pf-skills-row-items { display: flex; flex-wrap: wrap; gap: 10px; }
`;

const CSS_PROJECTS = `
.pf-filter-bar { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 56px; border-bottom: 1px solid var(--line); padding-bottom: 4px; }
.pf-tab {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: var(--ink-faint);
  position: relative;
  transition: color 0.3s ease;
}
.pf-tab::after {
  content: "";
  position: absolute;
  left: 16px; right: 16px; bottom: -1px;
  height: 2px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease), background 0.3s ease;
}
.pf-tab:hover { color: var(--ink); }
.pf-tab.is-active { color: var(--ink); }
.pf-tab.is-active::after { transform: scaleX(1); background: var(--accent); }

.pf-featured-list { display: flex; flex-direction: column; gap: clamp(48px,8vw,96px); margin-bottom: clamp(64px,10vw,112px); }
.pf-featured-card { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,5vw,64px); align-items: center; }
.pf-featured-card.is-reverse .pf-featured-visual { order: 2; }
.pf-featured-visual {
  aspect-ratio: 4/3;
  border-radius: var(--r-lg);
  border: 1px solid var(--line);
  background: linear-gradient(155deg, var(--paper-alt), var(--surface));
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 24px;
}
.pf-featured-visual.has-image {
  padding: 0;
  background: none;
}
.pf-featured-visual::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.6;
  mask-image: radial-gradient(circle at 28% 28%, black, transparent 68%);
}
.pf-featured-visual.has-image::before {
  display: none;
}
.pf-featured-visual .pf-idx-big { position: relative; font-family: var(--font-display); font-size: clamp(3rem,7vw,5.5rem); color: var(--line-strong); font-weight: 700; line-height: 1; }
.pf-featured-img { width: 100%; height: 100%; object-fit: cover; }
.pf-featured-body { display: flex; flex-direction: column; gap: 18px; }
.pf-featured-kicker { display: flex; align-items: center; gap: 14px; }
.pf-featured-title { font-size: clamp(1.6rem, 2.6vw, 2.1rem); }
.pf-featured-desc { color: var(--ink-soft); font-size: 1.02rem; line-height: 1.6; max-width: 48ch; }
.pf-featured-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.pf-featured-actions { display: flex; align-items: center; gap: 20px; margin-top: 4px; flex-wrap: wrap; }

.pf-secondary-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.pf-secondary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; margin-bottom: clamp(64px,10vw,112px); }
.pf-secondary-card { background: var(--surface); padding: 32px; display: flex; flex-direction: column; gap: 16px; transition: background 0.3s ease; cursor: pointer; border: none; text-align: left; width: 100%; }
.pf-secondary-card:hover { background: var(--accent-soft); }
.pf-secondary-card-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.pf-secondary-card h3 { font-size: 1.2rem; }
.pf-secondary-card p { color: var(--ink-soft); font-size: 0.95rem; line-height: 1.55; }
.pf-secondary-card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 8px; }

.pf-compact-wrap { border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; background: var(--surface); }
.pf-compact-head { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: var(--paper-alt); border-bottom: 1px solid var(--line); }
.pf-compact-head h3 { font-size: 0.95rem; }
.pf-compact-row {
  display: grid;
  grid-template-columns: 42px 1fr auto auto;
  gap: 18px;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--line);
  transition: background 0.25s ease;
  cursor: pointer;
  background: none;
  border-left: none; border-right: none; border-bottom: none;
  width: 100%;
  text-align: left;
}
.pf-compact-row:first-of-type { border-top: none; }
.pf-compact-row:hover { background: var(--accent-soft); }
.pf-compact-row-title { font-family: var(--font-display); font-size: 0.98rem; font-weight: 600; }
.pf-compact-row-role { color: var(--ink-faint); font-size: 0.8rem; }

.pf-modal-backdrop {
  position: fixed; inset: 0; z-index: 80;
  background: rgba(20, 23, 27, 0.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.pf-modal-backdrop.is-open { opacity: 1; visibility: visible; }
.pf-modal {
  background: var(--surface);
  border-radius: var(--r-lg);
  max-width: 640px;
  width: 100%;
  max-height: 86vh;
  overflow-y: auto;
  padding: clamp(28px,4vw,44px);
  box-shadow: var(--shadow-md);
  transform: translateY(24px) scale(0.98);
  transition: transform 0.35s var(--ease);
}
.pf-modal-backdrop.is-open .pf-modal { transform: translateY(0) scale(1); }
.pf-modal-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 8px; }
.pf-modal-close { background: var(--paper-alt); border: 1px solid var(--line); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; flex: none; transition: background 0.25s ease; }
.pf-modal-close:hover { background: var(--accent-soft); }
.pf-modal h3 { font-size: clamp(1.4rem, 3vw, 1.8rem); margin-bottom: 6px; }
.pf-modal-block { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
.pf-modal-block:first-of-type { border-top: none; margin-top: 18px; padding-top: 0; }
.pf-modal-block h4 { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 10px; }
.pf-modal-block p { color: var(--ink-soft); line-height: 1.6; font-size: 0.98rem; }
.pf-modal-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.pf-modal-links { display: flex; flex-wrap: wrap; gap: 14px; }
`;

const CSS_EXPERIENCE_FOOTER = `
.pf-exp-list { display: flex; flex-direction: column; }
.pf-exp-row { padding: 40px 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: 80px 1fr 1.4fr; gap: 32px; align-items: start; }
.pf-exp-row:last-child { border-bottom: 1px solid var(--line); }
.pf-exp-num { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-faint); padding-top: 8px; }
.pf-exp-role h3 { font-size: clamp(1.4rem, 2.4vw, 1.9rem); margin-bottom: 10px; }
.pf-exp-role p { color: var(--ink-soft); font-size: 0.95rem; max-width: 34ch; }
.pf-exp-projects { display: flex; flex-wrap: wrap; gap: 10px; align-content: flex-start; }
.pf-exp-chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border: 1px solid var(--line-strong); border-radius: var(--r-sm); font-size: 0.85rem; font-weight: 500; color: var(--ink-soft); transition: all 0.25s ease; background: none; }
.pf-exp-chip:hover { border-color: var(--accent); color: var(--accent-dark); background: var(--accent-soft); }
.pf-exp-chip .pf-idx { color: var(--ink-faint); font-size: 0.72rem; }

.pf-cta-section { text-align: center; padding: clamp(80px,12vw,140px) 0; }
.pf-cta-title { font-size: clamp(2.2rem, 5vw, 4rem); max-width: 18ch; margin: 0 auto 28px; line-height: 1.08; }
.pf-cta-sub { color: var(--ink-soft); font-size: 1.05rem; max-width: 44ch; margin: 0 auto 36px; }
.pf-cta-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

.pf-footer { border-top: 1px solid var(--line); padding: 48px 0 32px; }
.pf-footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 32px; flex-wrap: wrap; padding-bottom: 32px; margin-bottom: 24px; border-bottom: 1px solid var(--line); }
.pf-footer-brand { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; }
.pf-footer-tag { color: var(--ink-faint); font-size: 0.9rem; margin-top: 6px; max-width: 32ch; }
.pf-footer-links { display: flex; gap: 28px; flex-wrap: wrap; }
.pf-footer-links a { font-size: 0.92rem; color: var(--ink-soft); }
.pf-footer-links a:hover { color: var(--accent-dark); }
.pf-footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.04em; color: var(--ink-faint); text-transform: uppercase; }
`;

const CSS_MOTION_RESPONSIVE = `
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.pf-compact-row-cat { justify-self: end; }
.pf-compact-row-link svg { width: 16px; height: 16px; color: var(--ink-faint); transition: transform 0.25s ease, color 0.25s ease; }
.pf-compact-row:hover .pf-compact-row-link svg { color: var(--accent-dark); transform: translate(2px,-2px); }

.pf-nav-links a:focus-visible, .pf-compact-row:focus-visible, .pf-secondary-card:focus-visible, .pf-exp-chip:focus-visible, .pf-featured-actions a:focus-visible, .pf-modal-links a:focus-visible, .pf-footer-links a:focus-visible, .pf-nav-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (max-width: 960px) {
  .pf-hero-grid { grid-template-columns: 1fr; }
  .pf-hero-panel { position: static; }
}
@media (max-width: 880px) {
  .pf-nav-links, .pf-nav-actions .pf-btn { display: none; }
  .pf-nav-toggle { display: inline-flex; align-items: center; justify-content: center; }
  .pf-about-grid { grid-template-columns: 1fr; }
}
@media (max-width: 860px) {
  .pf-featured-card { grid-template-columns: 1fr; }
  .pf-featured-card.is-reverse .pf-featured-visual { order: 0; }
  .pf-featured-visual { aspect-ratio: 16/9; }
}
@media (max-width: 760px) {
  .pf-exp-row { grid-template-columns: 1fr; gap: 14px; }
  .pf-exp-num { padding-top: 0; }
}
@media (max-width: 700px) {
  .pf-skills-row { grid-template-columns: 1fr; gap: 12px; }
  .pf-secondary-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .pf-about-grid-cards { grid-template-columns: 1fr; }
  .pf-compact-row { grid-template-columns: 28px 1fr auto; column-gap: 12px; }
  .pf-compact-row-cat { display: none; }
  .pf-hero-cta { flex-direction: column; align-items: stretch; }
  .pf-hero-cta .pf-btn { justify-content: center; }
  .pf-footer-top { flex-direction: column; }
  .pf-hero-title { max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .pf-root, .pf-root * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  NAV + HERO                                                         */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={"pf-nav" + (scrolled ? " is-scrolled" : "")}>
        <a href="#home" className="pf-nav-brand" onClick={() => setOpen(false)}>
          <span className="pf-nav-brand-mark">K</span>
          Keyra
        </a>
        <nav className="pf-nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="pf-nav-actions">
          <a href="#contact" className="pf-btn pf-btn-primary">
            Contact Me
          </a>
          <button
            className="pf-nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <div className={"pf-nav-mobile" + (open ? " is-open" : "")} aria-hidden={!open}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="pf-link-arrow" style={{ fontSize: "1.3rem" }}>
          Contact Me <ArrowRight />
        </a>
      </div>
    </>
  );
}

const POSITIONING = ["UI/UX", "Web Development", "Data Science", "Machine Learning", "Dashboard", "Project Management"];

function Hero() {
  return (
    <section id="home" className="pf-hero">
      <div className="pf-container pf-hero-grid">
        <div className="pf-hero-copy">
          <Reveal as="span" className="pf-eyebrow">
            Digital Business · UNM · Makassar
          </Reveal>
          <Reveal as="h1" className="pf-hero-title" delay={80}>
            Turning business problems into interfaces, dashboards, and decisions.
          </Reveal>
          <Reveal as="p" className="pf-hero-sub" delay={160}>
            Keyra — a Digital Business student working across UI/UX design, web development, data science &amp;
            machine learning, and project leadership. Eighteen projects, one throughline.
          </Reveal>
          <Reveal delay={240} className="pf-hero-cta">
            <a href="#work" className="pf-btn pf-btn-primary">
              View Work <ArrowRight size={17} />
            </a>
            <a href="#about" className="pf-btn pf-btn-ghost">
              About Me
            </a>
          </Reveal>
          <Reveal delay={320} className="pf-hero-positioning">
            {POSITIONING.map((p, i) => (
              <span key={p}>
                {p}
                {i < POSITIONING.length - 1 ? " ·" : ""}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="pf-hero-panel-wrap">
          <div className="pf-hero-panel">
            <div className="pf-hero-panel-head">
              <span className="pf-mono-label">Focus Areas</span>
              <span className="pf-idx">06</span>
            </div>
            <ul className="pf-hero-panel-list">
              {POSITIONING.map((p, i) => (
                <li key={p} className={i === 0 ? "is-live" : ""}>
                  <span className="pf-idx">{pad2(i + 1)}</span>
                  {p}
                  <span className="dot" />
                </li>
              ))}
            </ul>
            <div className="pf-hero-panel-foot">
              <div>
                <strong>18</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Roles</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="pf-container">
        <span className="pf-hero-scroll-cue">Scroll to explore</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT + SKILLS                                                     */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  { num: "01", title: "Business", text: "Digital Business coursework grounded in real operations — supply chain, financial systems, market analysis." },
  { num: "02", title: "Data", text: "R-based dashboards, clustering, classification and forecasting — models built to be read, not just run." },
  { num: "03", title: "Design", text: "UI/UX from user flow to prototype — Riasin's Figma flow is the clearest example." },
  { num: "04", title: "Leadership", text: "Directing delivery as project manager for Fanzyy.id, and agency lead for Simulasi Gaya." },
];

function About() {
  return (
    <section id="about" className="pf-section">
      <div className="pf-container pf-about-grid">
        <Reveal className="pf-about-lead">
          <span className="pf-eyebrow">About</span>
          <h2>Business, translated into systems people can actually use.</h2>
        </Reveal>
        <div className="pf-about-body">
          <Reveal as="p" className="pf-about-p" delay={80}>
            Studying Digital Business at Universitas Negeri Makassar, where group coursework rarely stays on paper —
            it tends to ship as working dashboards, live websites, and structured design systems.
          </Reveal>
          <div className="pf-about-grid-cards">
            {CAPABILITIES.map((c, i) => (
              <Reveal as="div" key={c.num} className="pf-about-card" delay={120 + i * 60}>
                <span className="pf-idx">{c.num}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="pf-section pf-section-alt">
      <div className="pf-container">
        <div className="pf-section-head">
          <Reveal as="span" className="pf-eyebrow">
            Capabilities
          </Reveal>
          <Reveal as="h2" delay={80}>
            Skills, grouped by how they actually get used.
          </Reveal>
        </div>
        <div className="pf-skills-list">
          {SKILLS.map((s, i) => (
            <Reveal as="div" key={s.group} className="pf-skills-row" delay={i * 70}>
              <div className="pf-skills-row-label">
                <span className="pf-idx">{pad2(i + 1)}</span>
                <h3>{s.group}</h3>
              </div>
              <div className="pf-skills-row-items">
                {s.items.map((it) => (
                  <span key={it} className="pf-tag pf-tag-outline">
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT CARD VARIANTS + DETAIL MODAL                               */
/* ------------------------------------------------------------------ */

function categoryLabels(categories) {
  return categories.map((c) => FILTERS.find((f) => f.key === c)?.label).filter(Boolean);
}

function FeaturedProjectCard({ project, index, onOpen }) {
  return (
    <Reveal as="article" className={"pf-featured-card" + (index % 2 === 1 ? " is-reverse" : "")}>
      <div className={"pf-featured-visual" + (project.img ? " has-image" : "")} aria-hidden="true">
        {project.img ? (
          <img src={project.img} alt={project.title} className="pf-featured-img" />
        ) : (
          <span className="pf-idx-big">{project.num}</span>
        )}
      </div>
      <div className="pf-featured-body">
        <div className="pf-featured-kicker">
          <span className="pf-idx">№ {project.num} / 18</span>
          {categoryLabels(project.categories).map((c) => (
            <span key={c} className="pf-tag">
              {c}
            </span>
          ))}
        </div>
        <h3 className="pf-featured-title">{project.title}</h3>
        <p className="pf-featured-desc">{project.description}</p>
        <div className="pf-featured-actions">
          <button className="pf-link-arrow" onClick={() => onOpen(project)}>
            View Project <ArrowRight />
          </button>
          {project.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="pf-link-arrow">
              {l.label} <ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function SecondaryProjectCard({ project, onOpen }) {
  return (
    <Reveal as="button" className="pf-secondary-card" onClick={() => onOpen(project)}>
      <div className="pf-secondary-card-head">
        <span className="pf-idx">№ {project.num}</span>
        {project.role && <span className="pf-tag pf-tag-outline">{project.role}</span>}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="pf-secondary-card-tags">
        {categoryLabels(project.categories).map((c) => (
          <span key={c} className="pf-tag">
            {c}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

function CompactProjectRow({ project, onOpen }) {
  const cats = categoryLabels(project.categories);
  return (
    <button className="pf-compact-row" onClick={() => onOpen(project)}>
      <span className="pf-idx">{project.num}</span>
      <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <span className="pf-compact-row-title">{project.title}</span>
        <span className="pf-compact-row-role">{project.role || cats.join(" / ")}</span>
      </span>
      <span className="pf-tag pf-tag-outline pf-compact-row-cat">{cats[0]}</span>
      <span className="pf-compact-row-link">
        <ArrowUpRight size={16} />
      </span>
    </button>
  );
}

function ProjectDetailModal({ project, onClose }) {
  const isOpen = !!project;
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={"pf-modal-backdrop" + (isOpen ? " is-open" : "")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      {project && (
        <div className="pf-modal" role="dialog" aria-modal="true" aria-labelledby="pf-modal-title">
          <div className="pf-modal-head">
            <div>
              <span className="pf-idx">№ {project.num} / 18</span>
              <h3 id="pf-modal-title">{project.title}</h3>
              <div className="pf-modal-tags">
                {categoryLabels(project.categories).map((c) => (
                  <span key={c} className="pf-tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <button className="pf-modal-close" ref={closeBtnRef} onClick={onClose} aria-label="Close project detail">
              <X size={18} />
            </button>
          </div>

          <div className="pf-modal-block">
            <h4>Overview</h4>
            <p>{project.description}</p>
          </div>

          {project.role && (
            <div className="pf-modal-block">
              <h4>My Role</h4>
              <p>{project.role}</p>
            </div>
          )}

          {project.process && (
            <div className="pf-modal-block">
              <h4>Process</h4>
              <p>{project.process}</p>
            </div>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className="pf-modal-block">
              <h4>Technology &amp; Methods</h4>
              <div className="pf-modal-tags">
                {project.tech.map((t) => (
                  <span key={t} className="pf-tag pf-tag-outline">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pf-modal-block pf-modal-links">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="pf-link-arrow">
                {l.label} <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WORK (filter + featured/secondary/compact composition)             */
/* ------------------------------------------------------------------ */

function Work() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));
  const featured = filtered.filter((p) => p.tier === "featured");
  const secondary = filtered.filter((p) => p.tier === "secondary");
  const compact = filtered.filter((p) => p.tier === "compact");

  return (
    <section id="work" className="pf-section">
      <div className="pf-container">
        <div className="pf-section-head">
          <Reveal as="span" className="pf-eyebrow">
            Selected Work
          </Reveal>
          <Reveal as="h2" delay={80}>
            Seventeen projects, across four disciplines.
          </Reveal>
          <Reveal as="p" delay={140}>
            Case studies first, the full list below. Filter by discipline to narrow it down.
          </Reveal>
        </div>

        <Reveal className="pf-filter-bar" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              aria-current={filter === f.key ? "true" : undefined}
              className={"pf-tab" + (filter === f.key ? " is-active" : "")}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        {featured.length > 0 && (
          <div className="pf-featured-list">
            {featured.map((p, i) => (
              <FeaturedProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
            ))}
          </div>
        )}

        {secondary.length > 0 && (
          <>
            <div className="pf-secondary-head">
              <span className="pf-eyebrow">More Case Studies</span>
            </div>
            <div className="pf-secondary-grid">
              {secondary.map((p) => (
                <SecondaryProjectCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          </>
        )}

        {compact.length > 0 && (
          <div className="pf-compact-wrap">
            <div className="pf-compact-head">
              <h3 className="pf-mono-label">Additional Web Development Work</h3>
              <span className="pf-idx">{compact.length} projects</span>
            </div>
            {compact.map((p) => (
              <CompactProjectRow key={p.id} project={p} onOpen={setActive} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p style={{ color: "var(--ink-faint)", padding: "48px 0", textAlign: "center" }}>
            Nothing in this category yet.
          </p>
        )}
      </div>

      <ProjectDetailModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */

function ExperienceSection() {
  return (
    <section id="experience" className="pf-section pf-section-alt">
      <div className="pf-container">
        <div className="pf-section-head">
          <Reveal as="span" className="pf-eyebrow">
            Experience
          </Reveal>
          <Reveal as="h2" delay={80}>
            Four roles. One way of working.
          </Reveal>
        </div>
        <div className="pf-exp-list">
          {EXPERIENCE.map((e, i) => {
            const projects = e.projectIds.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);
            return (
              <Reveal as="div" key={e.role} className="pf-exp-row" delay={i * 60}>
                <span className="pf-exp-num">{pad2(i + 1)}</span>
                <div className="pf-exp-role">
                  <h3>{e.role}</h3>
                  <p>{e.blurb}</p>
                </div>
                <div className="pf-exp-projects">
                  {projects.map((p) => (
                    <a key={p.id} href={p.links[0]?.url} target="_blank" rel="noopener noreferrer" className="pf-exp-chip">
                      <span className="pf-idx">{p.num}</span>
                      {p.title}
                    </a>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT + FOOTER                                                   */
/* ------------------------------------------------------------------ */

function ContactFooter() {
  return (
    <>
      <section id="contact" className="pf-cta-section">
        <div className="pf-container">
          <Reveal as="span" className="pf-eyebrow">
            Contact
          </Reveal>
          <Reveal as="h2" className="pf-cta-title" delay={80}>
            Have a problem worth designing, building, or analyzing?
          </Reveal>
          <Reveal as="p" className="pf-cta-sub" delay={140}>
            Open to internships, collaborations, and freelance work across UI/UX, web development, and data.
          </Reveal>
          <Reveal delay={200} className="pf-cta-actions">
            <a href="mailto:hello@keyra.dev" className="pf-btn pf-btn-primary">
              Email Me <ArrowRight size={17} />
            </a>
            <a href="#work" className="pf-btn pf-btn-ghost">
              See Projects Again
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="pf-footer">
        <div className="pf-container">
          <div className="pf-footer-top">
            <div>
              <div className="pf-footer-brand">Keyra</div>
              <p className="pf-footer-tag">Digital Business student — UI/UX, web development, data science &amp; project leadership.</p>
            </div>
            <nav className="pf-footer-links" aria-label="Footer">
              <a href="mailto:hello@keyra.dev">Email</a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </nav>
          </div>
          <div className="pf-footer-bottom">
            <span>© {new Date().getFullYear()} Keyra. All work shown with permission.</span>
            <span>Designed &amp; built by Keyra</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  return (
    <div className="pf-root">
      <style>{CSS_TOKENS + CSS_LAYOUT + CSS_PROJECTS + CSS_EXPERIENCE_FOOTER + CSS_MOTION_RESPONSIVE}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <ExperienceSection />
      </main>
      <ContactFooter />
    </div>
  );
}
