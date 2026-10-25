import { included, pricing } from "@/content/pricing";
import { whatsappLink } from "@/content/site";
import { Glyphs, Tape } from "./Decor";
import { Reveal, Sticker } from "./Reveal";

function Price({ value }: { value: string }) {
  const [amount, unit] = value.split(" / ");
  return (
    <span className="shrink-0 text-right">
      <span className="heading text-[1.65rem] tracking-[-0.02em] text-accent sm:text-3xl">{amount}</span>
      {unit && <span className="ml-1 font-hand text-lg text-ink/60">/ {unit}</span>}
    </span>
  );
}

export function Pricing() {
  return (
    <section id="rates" className="relative z-10 mx-auto max-w-6xl scroll-mt-6 px-4 py-16 sm:px-8 sm:py-24">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-ink/60 uppercase">Simple, upfront pricing</p>
          <h2 className="heading mt-2 text-[13vw] sm:text-7xl lg:text-8xl">The Rates</h2>
        </div>
        <Sticker rotate={10} className="shrink-0">
          <span className="heading grid size-20 place-items-center rounded-full bg-accent p-2 text-center text-[9px] leading-tight tracking-normal text-white shadow-[0_8px_18px_-8px_rgb(0_0_0/0.5)] sm:size-28 sm:text-sm">
            Fast
            <br />
            delivery
          </span>
        </Sticker>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
        {pricing.map((plan, i) => (
          <Reveal key={plan.title} delay={i * 0.12} rotate={i % 2 ? 1.2 : -1.2}>
            <article className="relative bg-paper-light px-5 pt-9 pb-7 shadow-[0_22px_40px_-22px_rgb(0_0_0/0.55)] sm:px-8">
              <Tape className={`-top-3 left-1/2 -translate-x-1/2 ${i % 2 ? "rotate-2" : "-rotate-3"}`} />
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">
                  Plan {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[10px] font-semibold">
                  {plan.format}
                </span>
              </div>
              <h3 className="heading mt-3 text-[7vw] tracking-[-0.02em] sm:text-3xl">{plan.title}</h3>

              <ul className="mt-6">
                {plan.rows.map((row) => (
                  <li key={row.duration} className="flex items-end gap-2 border-t border-ink/10 py-4">
                    <span className="shrink-0 pb-1 text-[15px] font-semibold sm:text-base">{row.duration}</span>
                    <span aria-hidden className="mb-2 flex-1 border-b-2 border-dotted border-ink/25" />
                    <Price value={row.price} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="flex items-center gap-3">
          <h3 className="heading text-2xl tracking-[-0.02em] sm:text-3xl">What&apos;s included</h3>
          <Glyphs className="h-4 sm:h-5" />
        </div>
        <p className="font-hand mt-1 text-xl text-ink/60">…in every single edit</p>
      </Reveal>

      <ul className="mt-6 flex flex-wrap gap-3 sm:gap-4">
        {included.map((item, i) => (
          <li key={item}>
            <Sticker rotate={[-3, 2, -1, 3, -2, 1][i % 6]} delay={i * 0.05}>
              <span className="heading flex items-center gap-2 rounded-full bg-ink py-2.5 pr-4 pl-2.5 text-[11px] tracking-normal text-paper-light shadow-[0_8px_16px_-8px_rgb(0_0_0/0.6)] sm:text-sm">
                <span className="grid size-5 place-items-center rounded-full bg-accent sm:size-6">
                  <svg viewBox="0 0 24 24" className="size-3 sm:size-3.5" fill="none" aria-hidden>
                    <path d="M4 13l5 5L20 6" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </span>
            </Sticker>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
        <a
          href={whatsappLink("Hi! I'd like a quote for a video edit.")}
          target="_blank"
          rel="noopener noreferrer"
          className="heading rounded-full bg-accent px-7 py-4 text-sm tracking-normal text-white shadow-[0_10px_22px_-10px_rgb(255_33_25/0.8)] transition-transform active:scale-95"
        >
          Get a quote on WhatsApp
        </a>
        <p className="text-xs text-ink/55">Bulk projects &amp; monthly retainers? Let&apos;s talk — custom pricing available.</p>
      </Reveal>
    </section>
  );
}
