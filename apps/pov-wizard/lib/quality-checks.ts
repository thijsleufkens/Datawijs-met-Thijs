import type { PovDraft } from "./store";
import { WERKWOORDEN } from "./constants";

export type KwaliteitsCheck = {
  geslaagd: boolean;
  label: string;
  hint?: string;
};

const GETAL_PATROON = /\d/;
const EENHEID_PATRONEN =
  /%|euro|€|\$|per\s+\w+|punt|punten|dag|dagen|week|weken|maand|maanden|kwartaal|jaar/i;

function heeftKwantificeerbarImpact(impact: string): boolean {
  return GETAL_PATROON.test(impact) && EENHEID_PATRONEN.test(impact);
}

function heeftGebiedendWerkwoord(draft: PovDraft): boolean {
  return WERKWOORDEN.includes(
    draft.actie.werkwoord as (typeof WERKWOORDEN)[number]
  );
}

function heeftHorizon(draft: PovDraft): boolean {
  return !!draft.inzet.horizon;
}

export function berekenKwaliteit(
  _zin: string,
  draft: PovDraft
): KwaliteitsCheck[] {
  return [
    {
      geslaagd: heeftGebiedendWerkwoord(draft),
      label: "Bevat een concreet werkwoord in de gebiedende wijs",
      hint: heeftGebiedendWerkwoord(draft)
        ? undefined
        : "Kies een werkwoord in stap 3 (bijv. Verlaag, Verhoog, Stop).",
    },
    {
      geslaagd: heeftKwantificeerbarImpact(draft.inzet.impact),
      label: "Bevat een kwantificeerbare impact",
      hint: heeftKwantificeerbarImpact(draft.inzet.impact)
        ? undefined
        : "Je impact is vaag — kun je er een bedrag of percentage aan hangen?",
    },
    {
      geslaagd: heeftHorizon(draft),
      label: "Bevat een horizon",
      hint: heeftHorizon(draft)
        ? undefined
        : "Voeg in stap 4 toe binnen welke termijn de impact optreedt.",
    },
  ];
}
