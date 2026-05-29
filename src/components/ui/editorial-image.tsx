import Image from "next/image";

type Aspect = "3/4" | "4/5" | "16/9" | "fill";

type EditorialImageProps = {
  src: string;
  alt: string;
  aspect?: Aspect;
  className?: string;
  /** Above-the-fold images should set priority to skip lazy loading. */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
};

const aspectClass: Record<Exclude<Aspect, "fill">, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
};

/** Magazine-style photo: edge-to-edge image cropped to a fixed aspect, no borders. */
export function EditorialImage({
  src,
  alt,
  aspect = "16/9",
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: EditorialImageProps) {
  const ratio = aspect === "fill" ? "size-full min-h-[12rem]" : aspectClass[aspect];

  return (
    <div className={`hero-image-in relative w-full overflow-hidden bg-surface-muted ${ratio} ${className}`}>
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
    </div>
  );
}
