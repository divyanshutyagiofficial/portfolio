"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";

export function ContactSection() {
  const channels = [
    { icon: Mail, label: "email", value: profile.email, href: `mailto:${profile.email}`, accent: "text-(--color-link)" },
    { icon: Phone, label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, accent: "text-(--color-prompt)" },
    { icon: Github, label: "github", value: `@${profile.handle}`, href: profile.links.github, accent: "text-(--color-fg)" },
    { icon: Linkedin, label: "linkedin", value: "/in/divyanshutyagiofficial", href: profile.links.linkedin, accent: "text-(--color-link)" },
    { icon: MapPin, label: "location", value: profile.location, accent: "text-(--color-warn)" },
  ];

  return (
    <section className="mt-20">
      <SectionHeader
        id="contact"
        title="Get in touch"
        command="cat ~/contact.json"
        comment="The fastest way to reach me. I usually reply within a working day."
      />
      <TerminalWindow path="contact.json" hint="json · 5 keys">
        <pre className="text-xs sm:text-sm font-mono leading-relaxed">
          <span className="text-(--color-fg-muted)">{"{"}</span>
          {channels.map((c, i) => (
            <div key={c.label} className="pl-4 flex items-baseline gap-2 group">
              <c.icon size={12} className="text-(--color-fg-muted) shrink-0" />
              <span className="text-(--color-keyword)">"{c.label}"</span>
              <span className="text-(--color-fg-muted)">:</span>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") || c.href.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`${c.accent} hover:underline underline-offset-4`}
                >
                  "{c.value}"
                </a>
              ) : (
                <span className={c.accent}>"{c.value}"</span>
              )}
              {i < channels.length - 1 && (
                <span className="text-(--color-fg-muted)">,</span>
              )}
            </div>
          ))}
          <span className="text-(--color-fg-muted)">{"}"}</span>
        </pre>
      </TerminalWindow>
    </section>
  );
}
