import type { Project } from "@/types";

/**
 * Hardcoded projects — production / client work that can't be sourced
 * automatically (closed-source, behind enterprise auth, NDAs, etc.).
 * Edit this file directly when something ships.
 */
export const personalProjects: Project[] = [
  {
    id: "resume-builder",
    title: "Resume Builder",
    source: "personal",
    description:
      "Next.js 15 + React 19 resume builder with multiple templates, live theming, JSON / DOCX / PDF import & export and print-to-PDF — used to generate the polyglot resume on this site.",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "jsPDF", "docx"],
    domains: ["DevTool"],
    year: 2026,
  },
  {
    id: "shushi-express",
    title: "ShuShi Express — Growth Playbook",
    source: "personal",
    description:
      "Self-contained dashboard that diagnoses the @shushiexpress YouTube channel and lays out a 90-day growth plan (188 → 2,500 subs). YouTube Data API analyzer + Chart.js dashboard.",
    stack: ["TailwindCSS", "Chart.js", "Vanilla JS", "Python", "YouTube Data API"],
    domains: ["DevTool", "Other"],
    url: "https://youtube.com/@shushiexpress",
    year: 2026,
  },
  {
    id: "shibasea",
    title: "Shibasea — NFT Marketplace",
    source: "personal",
    description:
      "Full-stack NFT marketplace for the Shiba Inu ecosystem with mint, list, bid and royalty flows on Shibarium.",
    stack: ["Next.js", "TypeScript", "Wagmi", "WalletConnect", "Solidity"],
    domains: ["Web3"],
    url: "https://shibasea-mainnet.shibinternal.com/",
    year: 2024,
  },
  {
    id: "shib-io",
    title: "Shib.io — Shiba Inu Web App",
    source: "personal",
    description:
      "Public-facing portal for the Shiba Inu ecosystem — token info, staking entry-points, ecosystem hub.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Wagmi"],
    domains: ["Web3"],
    url: "https://www.shib.io",
    year: 2024,
  },
  {
    id: "shibarium",
    title: "Shibarium — L2 Web App",
    source: "personal",
    description:
      "Front-end for the Shibarium L2 chain — bridge, network stats, ecosystem links.",
    stack: ["Next.js", "TypeScript", "Web3.js", "ethers.js"],
    domains: ["Web3"],
    url: "https://shibarium.shib.io",
    year: 2024,
  },
  {
    id: "edward-jones",
    title: "Edward Jones",
    source: "personal",
    description:
      "Enterprise financial-services delivery — secure API integrations, design-system components, compliance-grade UX.",
    stack: ["Next.js", "ASP.NET Core", "C#", "Tailwind CSS", "Redux"],
    domains: ["FinTech", "Enterprise"],
    url: "https://edwardjones.com",
    year: 2023,
  },
  {
    id: "incedopay-admin",
    title: "Incedo Pay — B2B Admin Portal",
    source: "personal",
    description:
      "Admin console for the Citi B2B IncedoPay platform — merchant onboarding, transaction ops, role-based access.",
    stack: ["React", "Node.js", "Express", "MongoDB", "PCI"],
    domains: ["FinTech", "Enterprise"],
    url: "https://citib2badmin.incedopay.com",
    year: 2021,
  },
  {
    id: "incedopay-client",
    title: "Incedo Pay — B2B Client Portal",
    source: "personal",
    description:
      "Client-facing payments portal for Citi B2B partners (ELAN, BMW) — invoices, settlements, treasury.",
    stack: ["React", "Node.js", "Express", "MongoDB", "PCI"],
    domains: ["FinTech", "Enterprise"],
    url: "https://citib2bclient.incedopay.com",
    year: 2021,
  },
  {
    id: "pickn-play",
    title: "Pick'n Play",
    source: "personal",
    description:
      "Music discovery and request platform — curated playlists, social song queries, real-time updates.",
    stack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    domains: ["E-commerce", "Other"],
    url: "https://www.pickndplay.com",
    year: 2020,
  },
  {
    id: "wallzone",
    title: "Wallzone Trace",
    source: "personal",
    description:
      "Compliance / employee-tracking dashboard with audit trails and role-based reporting.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    domains: ["Enterprise"],
    url: "https://mycompliance.netlify.app/employees",
    year: 2020,
  },
  {
    id: "relief-hhs",
    title: "Relief HHS",
    source: "personal",
    description:
      "Healthcare staffing platform — shift management, credential tracking, HIPAA-aligned workflows.",
    stack: ["Angular", "Node.js", "MongoDB", "HIPAA"],
    domains: ["Healthcare"],
    url: "https://www.reliefhhs.com",
    year: 2019,
  },
  {
    id: "dro",
    title: "DRO — Daily Reading Observation",
    source: "personal",
    description:
      "Healthcare app for daily patient health monitoring with real-time data sync over WebSockets.",
    stack: ["Angular", "Node.js", "Socket.IO", "MongoDB"],
    domains: ["Healthcare"],
    url: "https://dro.carematix.com/#/002/abc233/welcome",
    year: 2019,
  },
];
