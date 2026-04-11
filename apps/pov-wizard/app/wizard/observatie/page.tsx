"use client";

import { usePovStore } from "@/lib/store";
import {
  WizardShell,
  FormVeld,
  Invoerveld,
  Tekstvak,
} from "@/components/wizard-shell";

export default function ObservatiePagina() {
  const { draft, setObservatie } = usePovStore();
  const { observatie } = draft;

  const isVolledig = !!(
    observatie.kpi &&
    observatie.huidigeWaarde &&
    observatie.verwachteWaarde &&
    observatie.periode
  );

  return (
    <WizardShell
      titel="Stap 1 — Observatie"
      vraag="Welke afwijking zie je, en in welke context?"
      terugHref="/"
      verderHref="/wizard/karakters"
      verderDisabled={!isVolledig}
    >
      <FormVeld label="KPI-naam">
        <Invoerveld
          value={observatie.kpi}
          onChange={(e) => setObservatie({ kpi: e.target.value })}
          placeholder="bijv. OEE lijn 3"
        />
      </FormVeld>

      <div className="grid grid-cols-2 gap-4">
        <FormVeld label="Huidige waarde">
          <Invoerveld
            value={observatie.huidigeWaarde}
            onChange={(e) => setObservatie({ huidigeWaarde: e.target.value })}
            placeholder="bijv. 68%"
          />
        </FormVeld>

        <FormVeld label="Verwachte waarde">
          <Invoerveld
            value={observatie.verwachteWaarde}
            onChange={(e) =>
              setObservatie({ verwachteWaarde: e.target.value })
            }
            placeholder="bijv. 82%"
          />
        </FormVeld>
      </div>

      <FormVeld label="Periode">
        <Invoerveld
          value={observatie.periode}
          onChange={(e) => setObservatie({ periode: e.target.value })}
          placeholder="bijv. week 14"
        />
      </FormVeld>

      <FormVeld label="Toelichting" optioneel>
        <Tekstvak
          value={observatie.toelichting}
          onChange={(e) => setObservatie({ toelichting: e.target.value })}
          placeholder="Wat valt je op? Wat weet je al? Bijv. al drie weken op rij onder target, vooral in de ochtendploeg."
          rows={4}
        />
      </FormVeld>

      {!isVolledig && (
        <p className="text-xs text-[var(--color-muted)]">
          Vul KPI-naam, huidige waarde, verwachte waarde en periode in om verder te gaan.
        </p>
      )}
    </WizardShell>
  );
}
