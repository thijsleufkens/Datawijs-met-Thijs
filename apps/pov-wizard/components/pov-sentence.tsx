"use client";

import { useState } from "react";
import { berekenKwaliteit } from "@/lib/quality-checks";
import type { PovDraft } from "@/lib/store";

type PovSentenceProps = {
  zin: string;
  draft: PovDraft;
  onZinChange: (zin: string) => void;
};

export function PovSentence({ zin, draft, onZinChange }: PovSentenceProps) {
  const [gekopieerd, setGekopieerd] = useState(false);
  const checks = berekenKwaliteit(zin, draft);

  async function kopieerNaarKlembord() {
    try {
      await navigator.clipboard.writeText(zin);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2000);
    } catch {
      // Fallback voor omgevingen zonder clipboard API
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Jouw Data POV</p>
          <button
            onClick={kopieerNaarKlembord}
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors border border-[var(--color-border)] rounded px-2 py-1"
          >
            {gekopieerd ? "Gekopieerd" : "Kopieer"}
          </button>
        </div>
        <textarea
          value={zin}
          onChange={(e) => onZinChange(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] resize-none leading-relaxed"
        />
        <p className="text-xs text-[var(--color-muted)] mt-1">
          De zin is een startpunt. Je mag hem aanpassen.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Kwaliteitschecks</p>
        {checks.map((check, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                check.geslaagd
                  ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                  : "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
              }`}
            >
              {check.geslaagd ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1.5,5 4,7.5 8.5,2.5" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="2" x2="5" y2="6" />
                  <circle cx="5" cy="8" r="0.5" fill="currentColor" />
                </svg>
              )}
            </span>
            <div>
              <p className="text-sm">{check.label}</p>
              {!check.geslaagd && check.hint && (
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{check.hint}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
