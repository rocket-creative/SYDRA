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
    /*
     * Square marks first. /sydra_icon.svg is the 1517x321 wide lockup, so a
     * launcher that masks to a square or circle letterboxes it to a sliver; the
     * generated icon routes are square PNGs and are what should be picked. The
     * SVG stays last as a scalable fallback. Still missing a 512x512 maskable,
     * which is what Chrome wants before it offers an install prompt.
     */
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/sydra_icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
