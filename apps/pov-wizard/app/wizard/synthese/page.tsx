"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePovStore } from "@/lib/store";
import { bouwPovZin } from "@/lib/pov-builder";
import { PovSentence } from "@/components/pov-sentence";

export default function SynthesePagina() {
  const { draft, setSynthese, reset } = usePovStore();
  const router = useRouter();

  const gegenereerdeZin = bouwPovZin(draft);

  useEffect(() => {
    if (!draft.syntheseZin && gegenereerdeZin) {
      setSynthese(gegenereerdeZin);
    }
  }, [draft.syntheseZin, gegenereerdeZin, setSynthese]);

  const huidigZin = draft.syntheseZin || gegenereerdeZin;

  if (!huidigZin) {
    return (
      <div className="py-12 text-center">
        <p className="text-[var(--color-muted)] mb-4">
          Niet alle velden zijn ingevuld. Ga terug en vul de wizard volledig in.
        </p>
        <Link
          href="/wizard/observatie"
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          Terug naar het begin
        </Link>
      </div>
    );
  }

  function handleOpnieuBeginnen() {
    reset();
    router.push("/");
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider mb-1">
          Stap 5 — Synthese
        </p>
        <h2 className="text-xl font-semibold tracking-tight">
          Jouw Data POV in één zin
        </h2>
      </div>

      <div className="mb-10">
        <PovSentence
          zin={huidigZin}
          draft={draft}
          onZinChange={setSynthese}
        />
      </div>

      <div className="mb-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
        <p className="text-sm font-medium mb-3">Samenvatting</p>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-[var(--color-muted)] w-28 flex-shrink-0">KPI</dt>
            <dd>{draft.observatie.kpi} ({draft.observatie.huidigeWaarde} vs. {draft.observatie.verwachteWaarde}, {draft.observatie.periode})</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[var(--color-muted)] w-28 flex-shrink-0">Held</dt>
            <dd>{draft.karakters.held}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[var(--color-muted)] w-28 flex-shrink-0">Tegenstander</dt>
            <dd>{draft.karakters.tegenstander}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[var(--color-muted)] w-28 flex-shrink-0">Actie</dt>
            <dd>{draft.actie.werkwoord} {draft.actie.object}{draft.actie.kwantificering ? ` ${draft.actie.kwantificering}` : ""}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-[var(--color-muted)] w-28 flex-shrink-0">Inzet</dt>
            <dd>{draft.inzet.impact} ({draft.inzet.categorie}, {draft.inzet.horizon})</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        <Link
          href="/wizard/inzet"
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
        >
          Terug
        </Link>

        <button
          onClick={handleOpnieuBeginnen}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-foreground)] text-[var(--color-surface)] px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Opnieuw beginnen
        </button>
      </div>
    </div>
  );
}
