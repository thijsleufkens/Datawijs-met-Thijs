export const HELDEN = [
  "klant",
  "operator",
  "planner",
  "monteur",
  "eindgebruiker",
  "anders",
] as const;

export const TEGENSTANDERS = [
  "verouderd systeem",
  "handmatig proces",
  "externe leverancier",
  "onduidelijke prioriteiten",
  "capaciteitstekort",
  "anders",
] as const;

export const WERKWOORDEN = [
  "Verlaag",
  "Verhoog",
  "Versnel",
  "Stop",
  "Herstart",
  "Herverdeel",
  "Vervang",
  "Onderzoek",
  "Escaleer",
  "Pauzeer",
] as const;

export const IMPACT_CATEGORIEEN = [
  { waarde: "omzet", label: "Omzet" },
  { waarde: "marge", label: "Marge" },
  { waarde: "klanttevredenheid", label: "Klanttevredenheid" },
  { waarde: "leverbetrouwbaarheid", label: "Leverbetrouwbaarheid" },
  { waarde: "veiligheid", label: "Veiligheid" },
  { waarde: "kosten", label: "Kosten" },
] as const;

export const HORIZONS = [
  "binnen een week",
  "binnen een maand",
  "binnen een kwartaal",
  "binnen een jaar",
] as const;

export type ImpactCategorie =
  | "omzet"
  | "marge"
  | "klanttevredenheid"
  | "leverbetrouwbaarheid"
  | "veiligheid"
  | "kosten";

export type Horizon =
  | "binnen een week"
  | "binnen een maand"
  | "binnen een kwartaal"
  | "binnen een jaar";
