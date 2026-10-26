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
  {
    id: "reel-01",
    title: "Class 12 ke baad",
    category: "Creator",
    orientation: "portrait",
    duration: "01:11",
    src: "/videos/reel-01.mp4",
    poster: "/posters/reel-01.jpg",
  },
  {
    id: "reel-02",
    title: "Internship report 2026",
    category: "Brand reel",
    orientation: "portrait",
    duration: "01:04",
    src: "/videos/reel-02.mp4",
    poster: "/posters/reel-02.jpg",
  },

  // Long-form (orientation: "landscape") goes here; the section stays hidden while there are none.
];

export const portraitVideos = videos.filter((v) => v.orientation === "portrait");
export const landscapeVideos = videos.filter((v) => v.orientation === "landscape");
