"use client";

import { useState } from "react";
import { usePovStore } from "@/lib/store";
import { HELDEN, TEGENSTANDERS } from "@/lib/constants";
import {
  WizardShell,
  FormVeld,
  Keuzelijst,
  Invoerveld,
} from "@/components/wizard-shell";

export default function KaraktersPagina() {
  const { draft, setKarakters } = usePovStore();
  const { karakters } = draft;

  const [heldAnders, setHeldAnders] = useState(
    !HELDEN.includes(karakters.held as (typeof HELDEN)[number]) &&
      karakters.held !== ""
      ? karakters.held
      : ""
  );
  const [tegenstanaderAnders, setTegenstanaderAnders] = useState(
    !TEGENSTANDERS.includes(
      karakters.tegenstander as (typeof TEGENSTANDERS)[number]
    ) && karakters.tegenstander !== ""
      ? karakters.tegenstander
      : ""
  );

  const heldSelectWaarde =
    heldAnders !== "" ||
    (!HELDEN.includes(karakters.held as (typeof HELDEN)[number]) &&
      karakters.held !== "")
      ? "anders"
      : karakters.held;

  const tegenstanaderSelectWaarde =
    tegenstanaderAnders !== "" ||
    (!TEGENSTANDERS.includes(
      karakters.tegenstander as (typeof TEGENSTANDERS)[number]
    ) &&
      karakters.tegenstander !== "")
      ? "anders"
      : karakters.tegenstander;

  const isVolledig = !!(karakters.held && karakters.tegenstander);

  function handleHeldChange(waarde: string) {
    if (waarde === "anders") {
      setHeldAnders("");
      setKarakters({ held: "" });
    } else {
      setHeldAnders("");
      setKarakters({ held: waarde });
    }
  }

  function handleTegenstanaderChange(waarde: string) {
    if (waarde === "anders") {
      setTegenstanaderAnders("");
      setKarakters({ tegenstander: "" });
    } else {
      setTegenstanaderAnders("");
      setKarakters({ tegenstander: waarde });
    }
  }

  return (
    <WizardShell
      titel="Stap 2 — Karakters"
      vraag="Wie of wat wordt hierdoor geraakt, en wat zit het in de weg?"
      terugHref="/wizard/observatie"
      verderHref="/wizard/actie"
      verderDisabled={!isVolledig}
    >
      <FormVeld label="De held — wie ondervindt hier last van?">
        <Keuzelijst
          value={heldSelectWaarde}
          onChange={(e) => handleHeldChange(e.target.value)}
        >
          <option value="">Kies een rol...</option>
          {HELDEN.map((held) => (
            <option key={held} value={held}>
              {held.charAt(0).toUpperCase() + held.slice(1)}
            </option>
          ))}
        </Keuzelijst>
        {heldSelectWaarde === "anders" && (
          <Invoerveld
            className="mt-2"
            value={heldAnders}
            onChange={(e) => {
              setHeldAnders(e.target.value);
              setKarakters({ held: e.target.value });
            }}
            placeholder="bijv. kwaliteitscontroleur"
            autoFocus
          />
        )}
      </FormVeld>

      <FormVeld label="De tegenstander — wat staat de held in de weg?">
        <Keuzelijst
          value={tegenstanaderSelectWaarde}
          onChange={(e) => handleTegenstanaderChange(e.target.value)}
        >
          <option value="">Kies een oorzaak...</option>
          {TEGENSTANDERS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </Keuzelijst>
        {tegenstanaderSelectWaarde === "anders" && (
          <Invoerveld
            className="mt-2"
            value={tegenstanaderAnders}
            onChange={(e) => {
              setTegenstanaderAnders(e.target.value);
              setKarakters({ tegenstander: e.target.value });
            }}
            placeholder="bijv. ontbrekende meetdata"
            autoFocus
          />
        )}
      </FormVeld>

      <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
        <p className="font-medium text-[var(--color-foreground)] mb-1">Waarom deze vraag?</p>
        <p>
          Abstracte cijfers krijgen urgentie als ze aan mensen worden gekoppeld.
          De held maakt duidelijk wie last heeft van de afwijking; de tegenstander
          geeft richting aan de oplossing.
        </p>
      </div>

      {!isVolledig && (
        <p className="text-xs text-[var(--color-muted)]">
          Kies een held en een tegenstander om verder te gaan.
        </p>
      )}
    </WizardShell>
  );
}
