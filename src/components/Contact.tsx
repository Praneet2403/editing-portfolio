import { site, whatsappLink } from "@/content/site";
import { Avatar, Glyphs } from "./Decor";
import { CopyEmail, EmailLink } from "./EmailLink";
import { Reveal, Sticker } from "./Reveal";

const links = [
  {
    label: "WhatsApp",
    href: whatsappLink(),
    className: "bg-ink text-paper-light",
    rotate: -3,
  },
  {
    label: "Instagram",
    href: `https://instagram.com/${site.contact.instagram}`,
    className: "bg-accent text-white",
    rotate: 2,
  },
  {
    label: "Email",
    href: `mailto:${site.contact.email}`,
    className: "bg-paper-light text-ink border-2 border-ink",
    rotate: -1,
  },
  {
    label: "Call",
    href: `tel:+${site.contact.whatsapp}`,
    className: "bg-ink text-paper-light",
    rotate: 3,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-32 sm:px-8 sm:pt-36 md:pb-20">
      <Reveal className="text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-ink/60 uppercase">Got footage?</p>
        <h2 className="heading mt-3 text-[14vw] sm:text-8xl lg:text-9xl">
          Let&apos;s make
          <br />
          it <span className="text-accent">cut.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-ink/70">
          Send your raw clips and a reference you love. I&apos;ll reply within a day with a plan and a quote.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
        {links.map((l, i) => {
          const className = `heading block w-60 rounded-2xl px-6 py-5 text-center text-lg tracking-normal shadow-[0_10px_24px_-10px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 active:scale-95 sm:w-auto ${l.className}`;
          return (
            <Sticker key={l.label} rotate={l.rotate} delay={i * 0.08}>
              {l.href.startsWith("mailto:") ? (
                <EmailLink className={className}>{l.label} ↗</EmailLink>
              ) : (
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={className}
                >
                  {l.label} ↗
                </a>
              )}
            </Sticker>
          );
        })}
      </div>

      <Reveal className="mt-8 flex flex-col items-center gap-1 text-center text-sm text-ink/70">
        <CopyEmail className="cursor-pointer font-semibold underline-offset-4 hover:underline" />
        <a href={`tel:+${site.contact.whatsapp}`} className="font-semibold underline-offset-4 hover:underline">
          {site.contact.phone}
        </a>
        <span className="text-xs text-ink/50">Call or WhatsApp — same number</span>
      </Reveal>

      <footer className="mt-20 flex flex-col items-center gap-4 border-t border-ink/15 pt-8 text-center sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar variant="head" sizes="40px" className="size-10 rounded-full bg-paper-light object-cover object-top" />
          <span className="heading text-sm tracking-normal">{site.name}</span>
        </div>
        <Glyphs className="h-4" />
        <p className="text-xs text-ink/50">
          © {site.year} {site.name} · {site.roles[0]}
        </p>
      </footer>
    </section>
  );
}
