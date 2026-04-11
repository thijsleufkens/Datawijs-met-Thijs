"use client";

import Link from "next/link";

type WizardShellProps = {
  titel: string;
  vraag: string;
  terugHref?: string;
  verderHref?: string;
  verderTekst?: string;
  verderDisabled?: boolean;
  onVerder?: () => void;
  children: React.ReactNode;
};

export function WizardShell({
  titel,
  vraag,
  terugHref,
  verderHref,
  verderTekst = "Verder",
  verderDisabled = false,
  onVerder,
  children,
}: WizardShellProps) {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider mb-1">
          {titel}
        </p>
        <h2 className="text-xl font-semibold tracking-tight">{vraag}</h2>
      </div>

      <div className="space-y-5 mb-10">{children}</div>

      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {terugHref ? (
          <Link
            href={terugHref}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            Terug
          </Link>
        ) : (
          <span />
        )}

        {verderHref ? (
          verderDisabled ? (
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-border)] text-[var(--color-muted)] px-5 py-2.5 text-sm font-medium cursor-not-allowed"
            >
              {verderTekst}
            </button>
          ) : (
            <Link
              href={verderHref}
              onClick={onVerder}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-foreground)] text-[var(--color-surface)] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {verderTekst}
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
}

type FormVeldProps = {
  label: string;
  optioneel?: boolean;
  children: React.ReactNode;
};

export function FormVeld({ label, optioneel = false, children }: FormVeldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
        {optioneel && (
          <span className="ml-1.5 text-xs font-normal text-[var(--color-muted)]">
            (optioneel)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputKlassen =
  "w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] placeholder:text-[var(--color-muted)] transition-colors";

export function Invoerveld({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={className ? `${inputKlassen} ${className}` : inputKlassen}
      {...props}
    />
  );
}

export function Tekstvak({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${inputKlassen} resize-none`}
      rows={4}
      {...props}
    />
  );
}

export function Keuzelijst({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${inputKlassen} cursor-pointer`} {...props}>
      {children}
    </select>
  );
}
