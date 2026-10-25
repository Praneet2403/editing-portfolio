import { site } from "@/content/site";
import { Avatar } from "./Decor";
import { Reveal, Sticker } from "./Reveal";

const handles = [
  "left-0 top-0",
  "left-1/2 top-0",
  "left-full top-0",
  "left-0 top-1/2",
  "left-full top-1/2",
  "left-0 top-full",
  "left-1/2 top-full",
  "left-full top-full",
];

/** Avatar inside an editor-style transform box, like a selected layer on a timeline. */
function SelectedLayer() {
  return (
    <div className="relative">
      <span className="absolute -top-5 left-0 font-mono text-[10px] text-accent/80">avatar.png · 100%</span>
      <div className="relative border-[1.5px] border-[#e2616a] bg-paper-light/40 px-2 pt-4 pb-2">
        {handles.map((pos) => (
          <span
            key={pos}
            className={`absolute size-2 -translate-x-1/2 -translate-y-1/2 border border-[#e2616a] bg-paper-light ${pos}`}
          />
        ))}
        <Avatar sizes="(min-width: 768px) 280px, 38vw" className="h-auto w-full" />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 pb-28 sm:px-8 sm:pb-36">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10">
        <div className="grid grid-cols-[38%_1fr] items-start gap-5 md:contents">
          <Sticker rotate={0} className="pt-5 md:pt-6">
            <SelectedLayer />
          </Sticker>

          <Reveal>
            <h2 className="heading text-[10.5vw] sm:text-7xl md:text-[4.6rem]">Hello</h2>
            <p className="mt-3 text-sm font-bold sm:text-base">{site.intro}</p>
            <div className="mt-2 hidden space-y-3 text-sm leading-relaxed text-ink/75 md:block">
              {site.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="-mt-4 space-y-3 text-[15px] leading-relaxed text-ink/75 md:hidden">
          {site.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
          <Reveal delay={0.1}>
            <h3 className="heading text-[5.2vw] sm:text-3xl md:text-2xl lg:text-3xl">Tools</h3>
            <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4">
              {site.tools.map((t) => (
                <li key={t.name} className="flex flex-col items-start gap-1.5">
                  <span
                    className="grid aspect-square w-full max-w-14 place-items-center overflow-hidden rounded-[22%] shadow-[0_6px_14px_-6px_rgb(0_0_0/0.45)]"
                    style={t.tile ? { background: t.tile, padding: "16%" } : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.logo} alt="" className="h-full w-full object-contain" />
                  </span>
                  <span className="text-[9px] leading-tight font-semibold text-ink/70 sm:text-[11px]">{t.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="heading text-[5.2vw] sm:text-3xl md:text-2xl lg:text-3xl">Experience</h3>
            <ul className="mt-4 space-y-4">
              {site.experience.map((e) => (
                <li key={e.period} className="text-xs sm:text-sm">
                  <p className="heading text-[11px] tracking-normal sm:text-xs">{e.period}</p>
                  <p className="mt-1 font-bold">{e.title}</p>
                  <p className="text-ink/60">{e.org}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
