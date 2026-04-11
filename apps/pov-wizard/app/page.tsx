"use client";

import Link from "next/link";
import { usePovStore } from "@/lib/store";

export default function LandingPagina() {
  const { draft, vulVoorbeeldIn } = usePovStore();

  const heeftDraft =
    draft.observatie.kpi ||
    draft.karakters.held ||
    draft.actie.werkwoord ||
    draft.inzet.impact;

  return (
    <div className="py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          POV Wizard
        </h1>
        <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-xl">
          Van afwijking op een dashboard naar een scherpe, verdedigbare mening.
          Vijf vragen, één zin.
        </p>
      </div>

      <div className="mb-10 space-y-4">
        {[
          { nummer: 1, label: "Wat zie je precies?" },
          { nummer: 2, label: "Wie wordt geraakt, en wat zit het in de weg?" },
          { nummer: 3, label: "Wat stel je voor?" },
          { nummer: 4, label: "Wat kost het als we niets doen?" },
          { nummer: 5, label: "Zet het in één zin." },
        ].map(({ nummer, label }) => (
          <div key={nummer} className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-[var(--color-border)] flex items-center justify-center text-xs font-medium text-[var(--color-muted)] flex-shrink-0">
              {nummer}
            </div>
            <span className="text-sm text-[var(--color-foreground)]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Link
          href="/wizard/observatie"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-foreground)] text-[var(--color-surface)] px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {heeftDraft ? "Doorgaan met huidige POV" : "Start nieuwe POV"}
        </Link>

        <button
          onClick={vulVoorbeeldIn}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] px-6 py-3 text-sm font-medium hover:border-[var(--color-foreground)]/30 transition-colors"
        >
          Vul voorbeeld in
        </button>
      </div>

      {heeftDraft && (
        <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-sm">
          <p className="text-[var(--color-muted)] mb-1">Huidige POV in uitvoering</p>
          <p className="font-medium">{draft.observatie.kpi || "Naamloos"}</p>
          {draft.observatie.huidigeWaarde && (
            <p className="text-[var(--color-muted)]">
              {draft.observatie.huidigeWaarde} (verwacht:{" "}
              {draft.observatie.verwachteWaarde}), {draft.observatie.periode}
            </p>
          )}
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-muted)] max-w-lg leading-relaxed">
          De structuur komt uit Nancy Duarte's DataStory-methodiek. Een sterke
          Data POV bestaat uit een observatie, een actie en de inzet. De wizard
          dwingt deze drie componenten af zonder dat je het boek hoeft te lezen.
        </p>
      </div>
    </div>
  );
}
