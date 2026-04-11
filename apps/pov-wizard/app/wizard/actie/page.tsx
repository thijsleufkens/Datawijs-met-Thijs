"use client";

import { usePovStore } from "@/lib/store";
import { WERKWOORDEN } from "@/lib/constants";
import {
  WizardShell,
  FormVeld,
  Keuzelijst,
  Invoerveld,
} from "@/components/wizard-shell";

export default function ActiePagina() {
  const { draft, setActie } = usePovStore();
  const { actie } = draft;

  const isVolledig = !!(actie.werkwoord && actie.object);

  return (
    <WizardShell
      titel="Stap 3 — Actie"
      vraag="Wat is je aanbeveling?"
      terugHref="/wizard/karakters"
      verderHref="/wizard/inzet"
      verderDisabled={!isVolledig}
    >
      <FormVeld label="Werkwoord">
        <Keuzelijst
          value={actie.werkwoord}
          onChange={(e) => setActie({ werkwoord: e.target.value })}
        >
          <option value="">Kies een werkwoord...</option>
          {WERKWOORDEN.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Keuzelijst>
      </FormVeld>

      <FormVeld label="Object — wat precies?">
        <Invoerveld
          value={actie.object}
          onChange={(e) => setActie({ object: e.target.value })}
          placeholder="bijv. de bandsnelheid op lijn 3"
        />
      </FormVeld>

      <FormVeld label="Met hoeveel of tot wanneer?" optioneel>
        <Invoerveld
          value={actie.kwantificering}
          onChange={(e) => setActie({ kwantificering: e.target.value })}
          placeholder="bijv. met 10% tot einde van de week"
        />
      </FormVeld>

      {actie.werkwoord && actie.object && (
        <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
          <p className="text-xs text-[var(--color-muted)] mb-1">Voorlopige actie</p>
          <p className="text-sm font-medium">
            {actie.werkwoord} {actie.object}
            {actie.kwantificering ? ` ${actie.kwantificering}` : ""}
          </p>
        </div>
      )}

      <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
        <p className="font-medium text-[var(--color-foreground)] mb-1">Waarom de gebiedende wijs?</p>
        <p>
          "We zouden kunnen overwegen om..." is geen besluit. "Verlaag de
          bandsnelheid met 10%" wel. De gebiedende wijs dwingt precisie af en
          maakt het makkelijker om het erover oneens te zijn.
        </p>
      </div>

      {!isVolledig && (
        <p className="text-xs text-[var(--color-muted)]">
          Kies een werkwoord en vul het object in om verder te gaan.
        </p>
      )}
    </WizardShell>
  );
}
