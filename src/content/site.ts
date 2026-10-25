// Everything personal lives here — edit this file to make the site yours.

export const site = {
  name: "Your Name",
  roles: ["Video Editor"],
  year: "2026",
  tagline: "Reels that stop the scroll. Long-form that keeps them watching.",

  // 3D designer-toy avatar, cut out from its background.
  // cutout: full bust, transparent · head: tight crop for the PORTFOLIO "O" · sticker: bust with red paper-cut outline
  avatar: {
    cutout: { src: "/avatar-cutout.png", width: 1000, height: 1498 },
    head: { src: "/avatar-head.png", width: 600, height: 724 },
    sticker: { src: "/avatar-sticker.png", width: 1100, height: 1513 },
  },

  intro: "Hi, I'm Your Name.",
  bio: [
    "I cut videos that feel fast, clean and intentional — from 15-second hooks to 20-minute YouTube deep dives.",
    "Pacing, sound design, captions and colour are where a good edit turns into one people share. That's the part I obsess over.",
    "Currently editing for creators, brands and small businesses across India and beyond.",
  ],

  // Official logos live in /public/logos
  tools: [
    { name: "Premiere Pro", logo: "/logos/premiere-pro.svg" },
    { name: "DaVinci Resolve", logo: "/logos/davinci-resolve.svg" },
    { name: "HyperFrames", logo: "/logos/hyperframes.svg", tile: "#111111" },
  ],

  experience: [
    { period: "2024 — Present", title: "Freelance Video Editor", org: "Creators & brands" },
    { period: "2023 — 2024", title: "Short-form Editor", org: "Agency / Studio name" },
  ],

  // Words that travel around the black strip
  marquee: ["Portfolio", "2026", "Video Editor"],

  contact: {
    // Country code + number, digits only (used for wa.me links)
    whatsapp: "919999999999",
    instagram: "yourhandle",
    email: "hello@example.com",
  },
};

export const whatsappLink = (text = "Hi! I'd like to get a video edited.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
