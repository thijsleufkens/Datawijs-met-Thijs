import type { PovDraft } from "./store";

export type KwaliteitsCheck = {
  geslaagd: boolean;
  label: string;
  hint?: string;
};

const GETAL_PATROON = /\d/;
const EENHEID_PATRONEN = [/%|euro|€|\$|per\s+\w+|punt|punten|dag|dagen|week|weken|maand|maanden|kwartaal|jaar/i];

function heeftKwantificeerbarImpact(impact: string): boolean {
  if (!GETAL_PATROON.test(impact)) return false;
  return EENHEID_PATRONEN.some((patroon) => patroon.test(impact));
}

const GEBIEDENDE_WERKWOORDEN = [
  "verlaag",
  "verhoog",
  "versnel",
  "stop",
  "herstart",
  "herverdeel",
  "vervang",
  "onderzoek",
  "escaleer",
  "pauzeer",
];

function heeftGebiedendWerkwoord(zin: string): boolean {
  const zinLower = zin.toLowerCase();
  return GEBIEDENDE_WERKWOORDEN.some((w) => zinLower.startsWith(`door ${w}`));
}

const HORIZON_PATRONEN = [
  /binnen een week/i,
  /binnen een maand/i,
  /binnen een kwartaal/i,
  /binnen een jaar/i,
  /vanaf/i,
  /deze week/i,
  /einde van/i,
];

function heeftHorizon(zin: string, draft: PovDraft): boolean {
  if (draft.inzet.horizon) return true;
  return HORIZON_PATRONEN.some((p) => p.test(zin));
}

export function berekenKwaliteit(
  zin: string,
  draft: PovDraft
): KwaliteitsCheck[] {
  return [
    {
      geslaagd: heeftGebiedendWerkwoord(zin),
      label: "Bevat een concreet werkwoord in de gebiedende wijs",
      hint: heeftGebiedendWerkwoord(zin)
        ? undefined
        : "Begin de aanbeveling met een gebiedende wijs (bijv. Verlaag, Verhoog, Stop).",
    },
    {
      geslaagd: heeftKwantificeerbarImpact(draft.inzet.impact),
      label: "Bevat een kwantificeerbare impact",
      hint: heeftKwantificeerbarImpact(draft.inzet.impact)
        ? undefined
        : "Je impact is vaag — kun je er een bedrag of percentage aan hangen?",
    },
    {
      geslaagd: heeftHorizon(zin, draft),
      label: "Bevat een horizon",
      hint: heeftHorizon(zin, draft)
        ? undefined
        : "Voeg toe wanneer de impact optreedt als er niets wordt gedaan.",
    },
  ];
}
