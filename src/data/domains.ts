import type { ProjectDomain } from "@/types";

/**
 * Industries / domains the portfolio owner has shipped production work in.
 *
 * `match` is the list of `ProjectDomain` tags from the Project type that
 * map to this industry (used to auto-derive project counts).
 *
 * Keep `description` plain-English — this section is the "non-developer
 * friendly" layer of the site.
 */
export interface DomainEntry {
  id: string;
  /** Plain-language industry name (eye-catcher) */
  title: string;
  /** Subtitle/tagline shown under the title in plain English */
  blurb: string;
  /** Lucide icon name (resolved in the component) */
  icon:
    | "banknote"
    | "heart-pulse"
    | "blocks"
    | "building2"
    | "shopping-cart"
    | "wrench";
  /** Project domains from `ProjectDomain` that map to this industry */
  match: ProjectDomain[];
  /** Notable clients / brands worked with in this industry */
  clients: string[];
  /** Key technologies for this industry */
  highlights: string[];
  /** Color accent (Tailwind text class), used for icons + titles */
  accent: string;
}

export const domains: DomainEntry[] = [
  {
    id: "fintech",
    title: "FinTech & Banking",
    blurb:
      "Payments, treasury and banking platforms — from card-acceptance pipelines to enterprise smart-routing engines.",
    icon: "banknote",
    match: ["FinTech"],
    clients: ["Citi B2B", "Edward Jones", "U.S. Bank", "ELAN"],
    highlights: [
      "PCI DSS",
      "Payment routing",
      "Treasury / settlements",
      "Role-based admin",
    ],
    accent: "text-(--color-prompt)",
  },
  {
    id: "healthcare",
    title: "Healthcare & Life Sciences",
    blurb:
      "HIPAA-aligned clinical and certification platforms — from board exams to real-time patient monitoring and clinical trials.",
    icon: "heart-pulse",
    match: ["Healthcare"],
    clients: [
      "ABOG",
      "Joint Commission",
      "Carematix (DRO)",
      "Relief HHS",
      "PALS — Lupus Trials",
    ],
    highlights: [
      "HIPAA",
      "WCAG 2.1 AAA",
      "Clinical trial workflows",
      "Real-time vitals",
    ],
    accent: "text-(--color-string)",
  },
  {
    id: "web3",
    title: "Web3 & Blockchain",
    blurb:
      "Wallet-connected dApps and NFT marketplaces on the Shibarium L2 ecosystem — mint, list, bid, royalties, bridges.",
    icon: "blocks",
    match: ["Web3"],
    clients: ["Shibasea", "Shib.io", "Shibarium L2"],
    highlights: [
      "EVM / Shibarium",
      "Wagmi · WalletConnect",
      "NFT marketplaces",
      "Solidity",
    ],
    accent: "text-(--color-keyword)",
  },
  {
    id: "enterprise",
    title: "Enterprise SaaS",
    blurb:
      "Headless architectures, design systems and large-team delivery for energy, accreditation and medical-device giants.",
    icon: "building2",
    match: ["Enterprise"],
    clients: [
      "Energy Australia",
      "STERIS",
      "Joint Commission",
      "Wallzone Trace",
    ],
    highlights: [
      "Next.js + .NET 8",
      "Headless CMS / Sitecore JSS",
      "Design systems",
      "Cross-functional leadership",
    ],
    accent: "text-(--color-link)",
  },
  {
    id: "ecommerce",
    title: "Consumer & E-commerce",
    blurb:
      "Public-facing consumer products with social, real-time and music-discovery flows.",
    icon: "shopping-cart",
    match: ["E-commerce"],
    clients: ["Pick'n Play"],
    highlights: ["Real-time (Socket.IO)", "Social UX", "Curated content"],
    accent: "text-(--color-warn)",
  },
  {
    id: "devtools",
    title: "Developer Tools",
    blurb:
      "Internal cloud platforms for static code analysis and security risk surfacing across enterprise codebases.",
    icon: "wrench",
    match: ["DevTool"],
    clients: ["CAST API Cloud"],
    highlights: ["Static analysis", "Cloud platform", "Security scanning"],
    accent: "text-(--color-fg)",
  },
];
