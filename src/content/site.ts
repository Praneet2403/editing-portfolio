// Everything personal lives here — edit this file to make the site yours.

export const site = {
  name: "24fps",
  roles: ["Video Editing"],
  year: "2026",
  tagline: "Reels that stop the scroll. Long-form that keeps them watching.",

  // 3D designer-toy avatar, cut out from its background.
  // cutout: full bust, transparent · head: tight crop for the PORTFOLIO "O" · sticker: bust with red paper-cut outline
  avatar: {
    cutout: { src: "/avatar-cutout.png", width: 1000, height: 1498 },
    head: { src: "/avatar-head.png", width: 600, height: 724 },
    sticker: { src: "/avatar-sticker.png", width: 1100, height: 1513 },
  },

  intro: "Hi, we're 24fps.",
  bio: [
    "We cut videos that feel fast, clean and intentional — from 15-second hooks to 20-minute YouTube deep dives.",
    "Our workflow is built for speed, so you get fast turnarounds without cutting corners — sharp pacing, clean captions, sound design and colour in every edit.",
    "Currently editing for creators, brands and small businesses across India and beyond.",
  ],

  // Official logos live in /public/logos
  tools: [
    { name: "Premiere Pro", logo: "/logos/premiere-pro.svg" },
    { name: "After Effects", logo: "/logos/after-effects.svg" },
    { name: "DaVinci Resolve", logo: "/logos/davinci-resolve.svg" },
    { name: "HyperFrames", logo: "/logos/hyperframes.svg", tile: "#111111" },
  ],

  // period is optional
  experience: [
    { period: "2024 — Present", title: "Freelance Video Editor", org: "Creators & brands" },
    { title: "Website Developer", org: "Portfolio & business websites" },
  ] as { period?: string; title: string; org: string }[],

  // Words that travel around the black strip
  marquee: ["Portfolio", "2026", "Video Editing"],

  contact: {
    // Country code + number, digits only (used for wa.me links)
    whatsapp: "919216917757",
    // Same number for calls; shown as written
    phone: "+91 92169 17757",
    instagram: "soni_mannat13",
    email: "duttapraneet@gmail.com",
  },
};

export const whatsappLink = (text = "Hi! I'd like to get a video edited.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
