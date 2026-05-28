type SidebarLabelProps = {
  children: string;
  className?: string;
};

export function SidebarLabel({ children, className = "" }: SidebarLabelProps) {
  return (
    <span
      className={`type-caption pointer-events-none select-none text-body/70 ${className}`}
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
      }}
    >
      {children}
    </span>
  );
}
