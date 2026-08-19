import Image from "next/image";

import type { EditorialAsset } from "@/lib/images";

type Aspect = "1/1" | "3/4" | "4/5" | "3/2" | "16/9" | "fill";

/**
 * Which edge of the source the crop holds on to. A square source in a wide
 * frame loses a third of its height, so a standing figure needs `top` to keep
 * the head in shot rather than the default centre crop.
 */
type Focus = "center" | "top" | "upper" | "bottom";

type EditorialImageProps = {
  /** Registry entry from `@/lib/images`, which carries the alt text. */
  asset: EditorialAsset;
  /** Overrides the registry alt only when the surrounding copy changes what the photo means. */
  alt?: string;
  aspect?: Aspect;
  className?: string;
  /** Above-the-fold images should set eager to skip lazy loading and preload. */
  eager?: boolean;
  focus?: Focus;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
};

const aspectClass: Record<Exclude<Aspect, "fill">, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
};

const focusClass: Record<Focus, string> = {
  center: "object-center",
  top: "object-top",
  upper: "object-[center_25%]",
  bottom: "object-bottom",
};

/** Magazine-style photo: edge-to-edge image cropped to a fixed aspect, no borders. */
export function EditorialImage({
  asset,
  alt,
  aspect = "16/9",
  className = "",
  eager = false,
  focus = "center",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: EditorialImageProps) {
  const ratio = aspect === "fill" ? "size-full min-h-[12rem]" : aspectClass[aspect];

  return (
    <div className={`hero-image-in relative w-full overflow-hidden bg-surface-muted ${ratio} ${className}`}>
      <Image
        alt={alt ?? asset.alt}
        className={`object-cover ${focusClass[focus]}`}
        fill
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        sizes={sizes}
        src={asset.src}
      />
    </div>
  );
}
