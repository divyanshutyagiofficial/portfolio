import type { Project } from "@/types";

/**
 * LinkedIn Featured / Projects entries — synced manually from the
 * LinkedIn profile. LinkedIn doesn't offer a public API for personal
 * profiles, so this file is the source of truth for the "From LinkedIn"
 * tab. Update when you update LinkedIn (~30 sec).
 *
 * To swap to a live API later (e.g. ProxyCurl), replace consumers
 * of `linkedinProjects` with a fetch call returning the same shape.
 */
export const linkedinProjects: Project[] = [
  {
    id: "abog",
    title: "ABOG — Continuous Certification Platform",
    source: "linkedin",
    description:
      "Healthcare certification portal for the American Board of Obstetrics & Gynecology — 6-year cycle dashboards, ACE Pilot framework, WCAG 2.1 AAA.",
    stack: ["React", "Angular", "ASP.NET Core", "C#", "WCAG 2.1"],
    domains: ["Healthcare", "Enterprise"],
    year: "2026 — Present",
  },
  {
    id: "joint-commission",
    title: "Joint Commission Modernization",
    source: "linkedin",
    description:
      "Design-system + accessibility transformation across TJC, JCI and the 'Connect' extranet. WCAG 2.1 AA, ARIA, keyboard-first.",
    stack: ["React", "Tailwind CSS", "ASP.NET Core", "Design System"],
    domains: ["Healthcare", "Enterprise"],
    year: "2025 — Present",
  },
  {
    id: "energy-australia",
    title: "Energy Australia — Headless Stack",
    source: "linkedin",
    description:
      "Led 6-dev team. REST + GraphQL (HotChocolate) on .NET 8 against Azure SQL & Cosmos DB. Serverless via Azure Functions, +30% reliability.",
    stack: [
      "Next.js",
      ".NET 8",
      "GraphQL",
      "Azure Functions",
      "Cosmos DB",
    ],
    domains: ["Enterprise"],
    year: "2024",
  },
  {
    id: "steris",
    title: "STERIS — Legacy → Headless Migration",
    source: "linkedin",
    description:
      "Migrated legacy CMS to Next.js + Sitecore JSS. C#/PowerShell bulk migration, SSG/ISR Core Web Vitals lift, WCAG-compliant component lib.",
    stack: ["Next.js", "Sitecore JSS", "ASP.NET Core", "C#", "WCAG"],
    domains: ["Enterprise"],
    year: "2023",
  },
  {
    id: "us-bank-smart-router",
    title: "US Bank — Smart Router",
    source: "linkedin",
    description:
      "Transaction routing engine for U.S. Bank — high-availability microservices in a regulated financial domain.",
    stack: [".NET", "C#", "Microservices"],
    domains: ["FinTech"],
    year: "2022",
  },
  {
    id: "cast-cloud",
    title: "CAST API Cloud — Code Analysis",
    source: "linkedin",
    description:
      "In-house cloud platform for static analysis & vulnerability detection. Surfaced security risks across enterprise codebases.",
    stack: [".NET", "Cloud", "Static Analysis"],
    domains: ["DevTool", "Enterprise"],
    year: "2022",
  },
  {
    id: "pals",
    title: "PALS — Lupus Clinical Trials",
    source: "linkedin",
    description:
      "Clinical-trial management for Lupus studies — real-time data capture, patient tracking, HIPAA-compliant workflows.",
    stack: ["Angular", "Node.js", "MongoDB", "HIPAA"],
    domains: ["Healthcare"],
    year: "2020",
  },
  {
    id: "elan-payments",
    title: "ELAN Payment Solutions",
    source: "linkedin",
    description:
      "Scalable payment processing pipelines — hardened data security, end-to-end transaction workflow optimisation.",
    stack: ["Node.js", "PCI", "Payments"],
    domains: ["FinTech"],
    year: "2021",
  },
];
