import type { PovDraft } from "./store";

export function bouwPovZin(draft: PovDraft): string {
  const { actie, karakters, inzet, observatie } = draft;

  const actieTekst =
    actie.werkwoord && actie.object
      ? `${actie.werkwoord.toLowerCase()} ${actie.object}${actie.kwantificering ? ` ${actie.kwantificering}` : ""}`
      : "";

  const horizonTekst = inzet.horizon || "";
  const heldTekst = karakters.held || "";
  const tegenstander = karakters.tegenstander || "";
  const impactTekst = inzet.impact || "";
  const kpiTekst = observatie.kpi || "";

  if (!actieTekst || !heldTekst || !tegenstander || !impactTekst || !kpiTekst) {
    return "";
  }

  const horizonDeel = horizonTekst ? ` vanaf ${horizonTekst}` : "";

  return `Door ${actieTekst}${horizonDeel} voorkomen we dat ${heldTekst} last blijven houden van ${tegenstander}, wat nu ${impactTekst} kost op ${kpiTekst}.`;
}
