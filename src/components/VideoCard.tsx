"use client";

import { useRef, useState } from "react";
import type { Video } from "@/content/videos";

const placeholderTones = [
  "from-[#2b1b3d] via-[#141018] to-[#3d1612]",
  "from-[#12283a] via-[#0e1116] to-[#2a2a12]",
  "from-[#3a1320] via-[#120d10] to-[#14263a]",
  "from-[#1d3324] via-[#0d110e] to-[#3a2512]",
];

function CropMarks() {
  return (
    <>
      {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map(
        (c) => (
          <span key={c} className={`absolute size-3 border-white/50 ${c}`} />
        ),
      )}
    </>
  );
}

/**
 * Plays a real clip when `src` is set; otherwise shows a viewer-style placeholder.
 * Videos never download until tapped (preload="none") to keep mobile data light.
 */
export function VideoCard({ video, index }: { video: Video; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const portrait = video.orientation === "portrait";
  const label = `${portrait ? "REEL" : "CUT"} ${String(index + 1).padStart(2, "0")}`;
  const playable = Boolean(video.src || video.youtube);
  const poster = video.poster ?? (video.youtube && `https://i.ytimg.com/vi/${video.youtube}/maxresdefault.jpg`);

  const play = () => {
    if (!playable) return;
    setPlaying(true);
    if (!video.youtube) requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div
      className={`relative overflow-hidden bg-ink ${portrait ? "aspect-[9/16]" : "aspect-video"}`}
    >
      {video.youtube && playing ? (
        // YouTube's player only loads once tapped, so the page never pays for it up front
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0&playsinline=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          // YouTube refuses to play (error 153) without a referrer
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : video.src && playing ? (
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={video.title}
        />
      ) : (
        <button
          type="button"
          onClick={play}
          disabled={!playable}
          aria-label={playable ? `Play ${video.title}` : `${video.title} — video coming soon`}
          className="group absolute inset-0 text-left text-white"
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className={`absolute inset-0 bg-gradient-to-br ${placeholderTones[index % placeholderTones.length]}`}>
              <span className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgb(255_255_255/0.06)_0_1px,transparent_1px_3px)]" />
            </span>
          )}

          <CropMarks />

          <span className="absolute top-3.5 left-5 flex items-center gap-1.5 font-mono text-[10px] tracking-wider sm:text-[11px]">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            {label}
          </span>
          <span className="absolute top-3.5 right-5 font-mono text-[10px] text-white/60 sm:text-[11px]">
            {portrait ? "9:16" : "16:9"}
          </span>

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform group-hover:scale-110 group-active:scale-95 sm:size-16">
              <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
              </svg>
            </span>
          </span>

          {!playable && (
            <span className="absolute inset-x-0 top-[62%] text-center font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
              Video coming soon
            </span>
          )}

          <span className="absolute inset-x-5 bottom-3.5 flex items-end justify-between gap-2 font-mono text-[10px] sm:text-[11px]">
            <span className="truncate text-white/80">{video.category}</span>
            <span className="shrink-0 rounded bg-black/60 px-1.5 py-0.5">{video.duration}</span>
          </span>
        </button>
      )}
    </div>
  );
}
