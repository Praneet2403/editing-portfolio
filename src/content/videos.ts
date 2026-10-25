// Add your edits here. Leave `src` empty to show a placeholder.
// `src` can be a path in /public (e.g. "/videos/reel-01.mp4") or a full URL from Cloudinary / Bunny / Blob.
// `poster` is the thumbnail shown before the video plays.

export type Video = {
  id: string;
  title: string;
  category: string;
  orientation: "portrait" | "landscape";
  duration: string;
  src?: string;
  poster?: string;
};

export const videos: Video[] = [
  { id: "reel-01", title: "Fashion drop teaser", category: "Brand reel", orientation: "portrait", duration: "00:28" },
  { id: "reel-02", title: "Café opening day", category: "Local business", orientation: "portrait", duration: "00:45" },
  { id: "reel-03", title: "Fitness transformation", category: "Creator", orientation: "portrait", duration: "00:30" },
  { id: "reel-04", title: "Skincare routine", category: "UGC ad", orientation: "portrait", duration: "00:22" },
  { id: "reel-05", title: "Travel montage", category: "Cinematic", orientation: "portrait", duration: "00:58" },
  { id: "reel-06", title: "Podcast clip", category: "Talking head", orientation: "portrait", duration: "00:40" },

  { id: "long-01", title: "YouTube explainer", category: "YouTube", orientation: "landscape", duration: "12:40" },
  { id: "long-02", title: "Wedding highlight film", category: "Cinematic", orientation: "landscape", duration: "06:15" },
  { id: "long-03", title: "Podcast episode", category: "Podcast", orientation: "landscape", duration: "48:02" },
  { id: "long-04", title: "Brand documentary", category: "Commercial", orientation: "landscape", duration: "04:30" },
];

export const portraitVideos = videos.filter((v) => v.orientation === "portrait");
export const landscapeVideos = videos.filter((v) => v.orientation === "landscape");
