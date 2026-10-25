import { site } from "@/content/site";
import { Avatar, TornEdge, bottomTearClip } from "./Decor";
import { DrumMarquee } from "./DrumMarquee";
import { Sticker } from "./Reveal";

const BOTTOM_SEED = 17;

/**
 * Crumpled black strip: words travel around a drum behind the avatar cut-out.
 * The cut-out pokes over the paper above and tucks under the torn paper below.
 */
export function Band() {
  return (
    <section
      aria-label={site.marquee.join(", ")}
      className="crumpled-black relative z-20 my-16 h-[clamp(200px,52vw,460px)] sm:my-24"
    >
      <TornEdge side="top" seed={5} />
      <TornEdge side="bottom" seed={BOTTOM_SEED} />

      <DrumMarquee />

      <div
        className="pointer-events-none absolute inset-x-0 -top-[38%] bottom-[calc(var(--tear-h)*-1)] z-10 flex justify-center"
        style={{ clipPath: bottomTearClip(BOTTOM_SEED) }}
      >
        <Sticker rotate={0} className="h-full origin-bottom">
          <Avatar
            variant="sticker"
            sizes="(min-width: 768px) 420px, 60vw"
            className="h-full w-auto max-w-none object-contain object-bottom"
          />
        </Sticker>
      </div>
    </section>
  );
}
