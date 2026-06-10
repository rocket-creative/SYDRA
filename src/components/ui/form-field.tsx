import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
};

export function FormField({ id, label, children, className = "", required = false }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="type-caption text-brand" htmlFor={id}>
        {label}
        {required ? (
          <span className="text-[var(--color-accent)]">
            <span aria-hidden> *</span>
            <span className="sr-only"> required</span>
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export const editorialInputClass =
  "mt-2 min-h-12 w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-body/50 focus:border-[var(--color-hero)] focus-visible:ring-0";

export const editorialSelectClass = `${editorialInputClass} cursor-pointer`;
