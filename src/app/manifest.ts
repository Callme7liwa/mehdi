import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OTAGE, soins anti-taches fabriqués au Maroc",
    short_name: "OTAGE",
    lang: "fr-MA",
    start_url: "/",
    display: "browser",
    background_color: "#f7efe6",
    theme_color: "#4a0d16",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
