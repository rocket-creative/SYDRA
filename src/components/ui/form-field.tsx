import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  hint?: string;
};

export function FormField({
  id,
  label,
  children,
  className = "",
  required = false,
  hint,
}: FormFieldProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-brand" htmlFor={id}>
          {label}
          {required ? (
            <span className="text-[var(--color-accent)]">
              <span aria-hidden> *</span>
              <span className="sr-only"> required</span>
            </span>
          ) : null}
        </label>
        {!required ? (
          <span className="type-caption text-body/55">Optional</span>
        ) : null}
      </div>
      {hint ? (
        <p className="mt-1 text-[13px] leading-snug text-body/80">{hint}</p>
      ) : null}
      {children}
    </div>
  );
}

export const editorialInputClass =
  "mt-2 min-h-12 w-full border border-rule bg-white px-3.5 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-body/45 hover:border-body/40 focus:border-[var(--color-hero)] focus:ring-2 focus:ring-[var(--color-hero)]/15";

export const editorialSelectClass = `${editorialInputClass} field-select cursor-pointer`;
