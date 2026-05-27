import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sydra",
    short_name: "Sydra",
    description: "NSA and federal IDR software for surgical billing teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1A2B48",
    icons: [
      {
        src: "/icon-sydra.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
