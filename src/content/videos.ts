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
  // YouTube video ID; plays in YouTube's player instead of `src`, thumbnail comes from YouTube if no poster
  youtube?: string;
  poster?: string;
};

export const videos: Video[] = [
  {
    id: "reel-03",
    title: "New Delhi",
    category: "Cinematic",
    orientation: "portrait",
    duration: "00:15",
    src: "/videos/reel-03.mp4",
    poster: "/posters/reel-03.jpg",
  },
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

  {
    id: "long-01",
    title: "Zero to 95% in Class 10",
    category: "YouTube",
    orientation: "landscape",
    duration: "18:18",
    youtube: "L6ex-TDWGz0",
  },
];

export const portraitVideos = videos.filter((v) => v.orientation === "portrait");
export const landscapeVideos = videos.filter((v) => v.orientation === "landscape");
