"use client";

import { usePovStore } from "@/lib/store";
import { IMPACT_CATEGORIEEN, HORIZONS } from "@/lib/constants";
import type { ImpactCategorie, Horizon } from "@/lib/constants";
import {
  WizardShell,
  FormVeld,
  Invoerveld,
  Keuzelijst,
} from "@/components/wizard-shell";

export default function InzetPagina() {
  const { draft, setInzet } = usePovStore();
  const { inzet } = draft;

  const isVolledig = !!(inzet.categorie && inzet.impact && inzet.horizon);

  return (
    <WizardShell
      titel="Stap 4 — Inzet"
      vraag="Wat gebeurt er als we niets doen?"
      terugHref="/wizard/actie"
      verderHref="/wizard/synthese"
      verderDisabled={!isVolledig}
    >
      <FormVeld label="Impact-categorie">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {IMPACT_CATEGORIEEN.map(({ waarde, label }) => {
            const geselecteerd = inzet.categorie === waarde;
            return (
              <button
                key={waarde}
                type="button"
                onClick={() =>
                  setInzet({ categorie: waarde as ImpactCategorie })
                }
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                  geselecteerd
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-foreground)]/30"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </FormVeld>

      <FormVeld label="Geschatte impact">
        <Invoerveld
          value={inzet.impact}
          onChange={(e) => setInzet({ impact: e.target.value })}
          placeholder="bijv. €40.000 per maand of 2 klachten per week"
        />
      </FormVeld>

      <FormVeld label="Binnen welke horizon treedt dit op?">
        <Keuzelijst
          value={inzet.horizon}
          onChange={(e) => setInzet({ horizon: e.target.value as Horizon })}
        >
          <option value="">Kies een horizon...</option>
          {HORIZONS.map((h) => (
            <option key={h} value={h}>
              {h.charAt(0).toUpperCase() + h.slice(1)}
            </option>
          ))}
        </Keuzelijst>
      </FormVeld>

      <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
        <p className="font-medium text-[var(--color-foreground)] mb-1">Waarom de inzet?</p>
        <p>
          Zonder inzet is er geen urgentie, zonder urgentie geen besluit. Een
          concrete schatting — ook als die niet precies klopt — is beter dan
          een vaag gevoel van "dit kost ons geld".
        </p>
      </div>

      {!isVolledig && (
        <p className="text-xs text-[var(--color-muted)]">
          Vul categorie, impact en horizon in om verder te gaan.
        </p>
      )}
    </WizardShell>
  );
}
