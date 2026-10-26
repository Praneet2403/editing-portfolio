"use client";

import { useState, type ReactNode } from "react";
import { site } from "@/content/site";

const subject = "Video edit enquiry";
const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${site.contact.email}&su=${encodeURIComponent(subject)}`;

/**
 * mailto: does nothing on computers without a mail app set up, so mouse users get Gmail compose
 * in a new tab instead. Phones keep mailto:, which opens their mail app.
 */
export function EmailLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href={mailto}
      className={className}
      onClick={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        e.preventDefault();
        window.open(gmail, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </a>
  );
}

/** The address as text; clicking copies it so it works with any mail provider. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.contact.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = mailto;
        }
      }}
    >
      {site.contact.email}
      <span className="ml-1.5 font-normal text-ink/50">{copied ? "· copied ✓" : "· tap to copy"}</span>
    </button>
  );
}
