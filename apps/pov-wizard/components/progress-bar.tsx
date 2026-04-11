"use client";

type ProgressBarProps = {
  stap: number;
  totaal: number;
  labels: string[];
};

export function ProgressBar({ stap, totaal, labels }: ProgressBarProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {labels.map((label, i) => {
          const stapNummer = i + 1;
          const isActief = stapNummer === stap;
          const isKlaar = stapNummer < stap;

          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isKlaar
                    ? "bg-[var(--color-foreground)] text-[var(--color-surface)]"
                    : isActief
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-[var(--color-border)] text-[var(--color-muted)]"
                }`}
              >
                {isKlaar ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                ) : (
                  stapNummer
                )}
              </div>
              <span
                className={`text-xs text-center hidden sm:block ${
                  isActief
                    ? "text-[var(--color-foreground)] font-medium"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent)] transition-all duration-300 rounded-full"
          style={{ width: `${((stap - 1) / (totaal - 1)) * 100}%` }}
        />
      </div>
      <p className="text-xs text-[var(--color-muted)] mt-2">
        Stap {stap} van {totaal}
      </p>
    </div>
  );
}
