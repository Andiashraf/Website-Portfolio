import re

filepath = r'c:\Users\Administrator\Website Portofolio\src\App.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace texts
text = text.replace("Seventeen projects", "Eighteen projects")
text = text.replace("<strong>17</strong>", "<strong>18</strong>")
text = text.replace("№ {project.num} / 17", "№ {project.num} / 18")

# Extract the PROJECTS array
match = re.search(r'const PROJECTS = \[(.*?)\];\n\nconst SKILLS', text, re.DOTALL)
if match:
    projects_content = match.group(1)

# I will just define the new array text directly in this python script.
new_projects_array = """  {
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
  }"""

text = re.sub(r'const PROJECTS = \[(.*?)\];\n\nconst SKILLS', f'const PROJECTS = [\n{new_projects_array}\n];\n\nconst SKILLS', text, flags=re.DOTALL)

new_experience = """const EXPERIENCE = [
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
];"""

text = re.sub(r'const EXPERIENCE = \[(.*?)\];', new_experience, text, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated successfully.")
