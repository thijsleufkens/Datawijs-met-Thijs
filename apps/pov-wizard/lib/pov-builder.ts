import type { PovDraft } from "./store";

// Omzetting van gebiedende wijs naar infinitief voor de zinsconstructie
// "Door [object] te [infinitief]" is correct Nederlands
const INFINITIEF: Record<string, string> = {
  Verlaag: "verlagen",
  Verhoog: "verhogen",
  Versnel: "versnellen",
  Stop: "stoppen",
  Herstart: "herstarten",
  Herverdeel: "herverdelen",
  Vervang: "vervangen",
  Onderzoek: "onderzoeken",
  Escaleer: "escaleren",
  Pauzeer: "pauzeren",
};

export function bouwPovZin(draft: PovDraft): string {
  const { actie, karakters, inzet, observatie } = draft;

  const infinitief = INFINITIEF[actie.werkwoord] ?? actie.werkwoord.toLowerCase();
  const objectDeel = actie.object
    ? `${actie.object}${actie.kwantificering ? ` ${actie.kwantificering}` : ""}`
    : "";

  const heldTekst = karakters.held;
  const tegenstander = karakters.tegenstander;
  const impactTekst = inzet.impact;
  const kpiTekst = observatie.kpi;

  if (!actie.werkwoord || !objectDeel || !heldTekst || !tegenstander || !impactTekst || !kpiTekst) {
    return "";
  }

  const horizonDeel = inzet.horizon ? ` ${inzet.horizon}` : "";

  // "Door de bandsnelheid met 10% te verlagen binnen een maand voorkomen we..."
  return `Door ${objectDeel} te ${infinitief}${horizonDeel} voorkomen we dat ${heldTekst} last blijven houden van ${tegenstander}, wat nu ${impactTekst} kost op ${kpiTekst}.`;
}
