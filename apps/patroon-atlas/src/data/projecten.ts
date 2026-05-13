export type Fase = "engineering" | "assemblage" | "inbedrijfstelling";

export type ProjectFase = {
  fase: Fase;
  geschatteUren: number;
  werkelijkeUren: number;
};

export type Project = {
  id: string;
  klant: string;
  machine: string;
  jaar: 2024 | 2025;
  omzet: number;
  margePercent: number;
  totaalUren: number;
  geplandeDoorlooptijdWeken: number;
  werkelijkeDoorlooptijdWeken: number;
  fases: ProjectFase[];
};

export const projecten: Project[] = [
  {
    id: "K2025-101",
    klant: "Brouwer Sauzen",
    machine: "Vulstation M40",
    jaar: 2025,
    omzet: 285000,
    margePercent: 22,
    totaalUren: 2400,
    geplandeDoorlooptijdWeken: 18,
    werkelijkeDoorlooptijdWeken: 19,
    fases: [
      { fase: "engineering", geschatteUren: 480, werkelijkeUren: 520 },
      { fase: "assemblage", geschatteUren: 1440, werkelijkeUren: 1480 },
      { fase: "inbedrijfstelling", geschatteUren: 360, werkelijkeUren: 400 },
    ],
  },
  {
    id: "K2025-102",
    klant: "De Vegter Vleeswaren",
    machine: "Sleevemachine S22",
    jaar: 2025,
    omzet: 240000,
    margePercent: 4,
    totaalUren: 2680,
    geplandeDoorlooptijdWeken: 16,
    werkelijkeDoorlooptijdWeken: 24,
    fases: [
      { fase: "engineering", geschatteUren: 360, werkelijkeUren: 620 },
      { fase: "assemblage", geschatteUren: 1280, werkelijkeUren: 1380 },
      { fase: "inbedrijfstelling", geschatteUren: 320, werkelijkeUren: 680 },
    ],
  },
  {
    id: "K2025-103",
    klant: "Hoogland Zuivel",
    machine: "Verpakkingslijn L100",
    jaar: 2025,
    omzet: 420000,
    margePercent: 19,
    totaalUren: 3600,
    geplandeDoorlooptijdWeken: 26,
    werkelijkeDoorlooptijdWeken: 28,
    fases: [
      { fase: "engineering", geschatteUren: 720, werkelijkeUren: 800 },
      { fase: "assemblage", geschatteUren: 2160, werkelijkeUren: 2200 },
      { fase: "inbedrijfstelling", geschatteUren: 540, werkelijkeUren: 600 },
    ],
  },
  {
    id: "K2025-104",
    klant: "Westland Bakkerijen",
    machine: "Trayloader T15",
    jaar: 2025,
    omzet: 145000,
    margePercent: 24,
    totaalUren: 1200,
    geplandeDoorlooptijdWeken: 12,
    werkelijkeDoorlooptijdWeken: 12,
    fases: [
      { fase: "engineering", geschatteUren: 200, werkelijkeUren: 200 },
      { fase: "assemblage", geschatteUren: 760, werkelijkeUren: 760 },
      { fase: "inbedrijfstelling", geschatteUren: 200, werkelijkeUren: 240 },
    ],
  },
  {
    id: "K2025-105",
    klant: "Bos Snacks",
    machine: "Inpakrobot R5",
    jaar: 2025,
    omzet: 95000,
    margePercent: 8,
    totaalUren: 920,
    geplandeDoorlooptijdWeken: 10,
    werkelijkeDoorlooptijdWeken: 14,
    fases: [
      { fase: "engineering", geschatteUren: 160, werkelijkeUren: 240 },
      { fase: "assemblage", geschatteUren: 560, werkelijkeUren: 540 },
      { fase: "inbedrijfstelling", geschatteUren: 140, werkelijkeUren: 220 },
    ],
  },
  {
    id: "K2025-106",
    klant: "Den Hartog Conserven",
    machine: "Etiketteermachine E12",
    jaar: 2025,
    omzet: 168000,
    margePercent: 17,
    totaalUren: 1380,
    geplandeDoorlooptijdWeken: 14,
    werkelijkeDoorlooptijdWeken: 15,
    fases: [
      { fase: "engineering", geschatteUren: 240, werkelijkeUren: 260 },
      { fase: "assemblage", geschatteUren: 880, werkelijkeUren: 900 },
      { fase: "inbedrijfstelling", geschatteUren: 220, werkelijkeUren: 220 },
    ],
  },
  {
    id: "K2025-107",
    klant: "Verlinden Vis",
    machine: "Stretchwikkelaar W8",
    jaar: 2025,
    omzet: 110000,
    margePercent: -3,
    totaalUren: 1480,
    geplandeDoorlooptijdWeken: 11,
    werkelijkeDoorlooptijdWeken: 19,
    fases: [
      { fase: "engineering", geschatteUren: 160, werkelijkeUren: 360 },
      { fase: "assemblage", geschatteUren: 680, werkelijkeUren: 760 },
      { fase: "inbedrijfstelling", geschatteUren: 160, werkelijkeUren: 360 },
    ],
  },
  {
    id: "K2025-108",
    klant: "Akkermans Suikerwerk",
    machine: "Vulstation M60",
    jaar: 2025,
    omzet: 340000,
    margePercent: 16,
    totaalUren: 2900,
    geplandeDoorlooptijdWeken: 22,
    werkelijkeDoorlooptijdWeken: 23,
    fases: [
      { fase: "engineering", geschatteUren: 560, werkelijkeUren: 600 },
      { fase: "assemblage", geschatteUren: 1740, werkelijkeUren: 1780 },
      { fase: "inbedrijfstelling", geschatteUren: 440, werkelijkeUren: 520 },
    ],
  },
  {
    id: "K2025-109",
    klant: "Ravenstein Banket",
    machine: "Trayloader T15",
    jaar: 2025,
    omzet: 132000,
    margePercent: 21,
    totaalUren: 1080,
    geplandeDoorlooptijdWeken: 11,
    werkelijkeDoorlooptijdWeken: 11,
    fases: [
      { fase: "engineering", geschatteUren: 180, werkelijkeUren: 180 },
      { fase: "assemblage", geschatteUren: 680, werkelijkeUren: 700 },
      { fase: "inbedrijfstelling", geschatteUren: 180, werkelijkeUren: 200 },
    ],
  },
  {
    id: "K2025-110",
    klant: "Vink Diepvries",
    machine: "Verpakkingslijn L100",
    jaar: 2025,
    omzet: 395000,
    margePercent: 7,
    totaalUren: 3800,
    geplandeDoorlooptijdWeken: 24,
    werkelijkeDoorlooptijdWeken: 32,
    fases: [
      { fase: "engineering", geschatteUren: 640, werkelijkeUren: 920 },
      { fase: "assemblage", geschatteUren: 2240, werkelijkeUren: 2380 },
      { fase: "inbedrijfstelling", geschatteUren: 480, werkelijkeUren: 500 },
    ],
  },
  {
    id: "K2025-111",
    klant: "Smaakhuis Groothandel",
    machine: "Etiketteermachine E12",
    jaar: 2025,
    omzet: 88000,
    margePercent: 12,
    totaalUren: 780,
    geplandeDoorlooptijdWeken: 9,
    werkelijkeDoorlooptijdWeken: 10,
    fases: [
      { fase: "engineering", geschatteUren: 140, werkelijkeUren: 160 },
      { fase: "assemblage", geschatteUren: 500, werkelijkeUren: 500 },
      { fase: "inbedrijfstelling", geschatteUren: 120, werkelijkeUren: 120 },
    ],
  },
  {
    id: "K2025-112",
    klant: "Klaver Kruiden",
    machine: "Inpakrobot R5",
    jaar: 2025,
    omzet: 76000,
    margePercent: 28,
    totaalUren: 640,
    geplandeDoorlooptijdWeken: 8,
    werkelijkeDoorlooptijdWeken: 8,
    fases: [
      { fase: "engineering", geschatteUren: 100, werkelijkeUren: 100 },
      { fase: "assemblage", geschatteUren: 420, werkelijkeUren: 420 },
      { fase: "inbedrijfstelling", geschatteUren: 120, werkelijkeUren: 120 },
    ],
  },
  {
    id: "K2025-113",
    klant: "Brouwer Sauzen",
    machine: "Etiketteermachine E12",
    jaar: 2025,
    omzet: 156000,
    margePercent: 15,
    totaalUren: 1320,
    geplandeDoorlooptijdWeken: 13,
    werkelijkeDoorlooptijdWeken: 14,
    fases: [
      { fase: "engineering", geschatteUren: 220, werkelijkeUren: 240 },
      { fase: "assemblage", geschatteUren: 840, werkelijkeUren: 860 },
      { fase: "inbedrijfstelling", geschatteUren: 220, werkelijkeUren: 220 },
    ],
  },
  {
    id: "K2024-091",
    klant: "Brouwer Sauzen",
    machine: "Vulstation M40",
    jaar: 2024,
    omzet: 268000,
    margePercent: 20,
    totaalUren: 2280,
    geplandeDoorlooptijdWeken: 18,
    werkelijkeDoorlooptijdWeken: 19,
    fases: [
      { fase: "engineering", geschatteUren: 460, werkelijkeUren: 480 },
      { fase: "assemblage", geschatteUren: 1360, werkelijkeUren: 1400 },
      { fase: "inbedrijfstelling", geschatteUren: 340, werkelijkeUren: 400 },
    ],
  },
  {
    id: "K2024-088",
    klant: "De Vegter Vleeswaren",
    machine: "Sleevemachine S22",
    jaar: 2024,
    omzet: 215000,
    margePercent: 11,
    totaalUren: 2100,
    geplandeDoorlooptijdWeken: 16,
    werkelijkeDoorlooptijdWeken: 18,
    fases: [
      { fase: "engineering", geschatteUren: 340, werkelijkeUren: 420 },
      { fase: "assemblage", geschatteUren: 1280, werkelijkeUren: 1280 },
      { fase: "inbedrijfstelling", geschatteUren: 280, werkelijkeUren: 400 },
    ],
  },
  {
    id: "K2024-082",
    klant: "Hoogland Zuivel",
    machine: "Trayloader T15",
    jaar: 2024,
    omzet: 138000,
    margePercent: 22,
    totaalUren: 1140,
    geplandeDoorlooptijdWeken: 12,
    werkelijkeDoorlooptijdWeken: 12,
    fases: [
      { fase: "engineering", geschatteUren: 200, werkelijkeUren: 200 },
      { fase: "assemblage", geschatteUren: 720, werkelijkeUren: 720 },
      { fase: "inbedrijfstelling", geschatteUren: 200, werkelijkeUren: 220 },
    ],
  },
  {
    id: "K2024-085",
    klant: "Westland Bakkerijen",
    machine: "Trayloader T15",
    jaar: 2024,
    omzet: 142000,
    margePercent: 25,
    totaalUren: 1180,
    geplandeDoorlooptijdWeken: 12,
    werkelijkeDoorlooptijdWeken: 12,
    fases: [
      { fase: "engineering", geschatteUren: 200, werkelijkeUren: 200 },
      { fase: "assemblage", geschatteUren: 740, werkelijkeUren: 740 },
      { fase: "inbedrijfstelling", geschatteUren: 200, werkelijkeUren: 240 },
    ],
  },
  {
    id: "K2024-079",
    klant: "Bos Snacks",
    machine: "Inpakrobot R5",
    jaar: 2024,
    omzet: 102000,
    margePercent: 14,
    totaalUren: 880,
    geplandeDoorlooptijdWeken: 10,
    werkelijkeDoorlooptijdWeken: 11,
    fases: [
      { fase: "engineering", geschatteUren: 160, werkelijkeUren: 180 },
      { fase: "assemblage", geschatteUren: 560, werkelijkeUren: 560 },
      { fase: "inbedrijfstelling", geschatteUren: 140, werkelijkeUren: 140 },
    ],
  },
  {
    id: "K2024-077",
    klant: "Den Hartog Conserven",
    machine: "Etiketteermachine E12",
    jaar: 2024,
    omzet: 152000,
    margePercent: 16,
    totaalUren: 1260,
    geplandeDoorlooptijdWeken: 14,
    werkelijkeDoorlooptijdWeken: 14,
    fases: [
      { fase: "engineering", geschatteUren: 220, werkelijkeUren: 240 },
      { fase: "assemblage", geschatteUren: 800, werkelijkeUren: 820 },
      { fase: "inbedrijfstelling", geschatteUren: 200, werkelijkeUren: 200 },
    ],
  },
  {
    id: "K2024-073",
    klant: "Verlinden Vis",
    machine: "Stretchwikkelaar W8",
    jaar: 2024,
    omzet: 124000,
    margePercent: 9,
    totaalUren: 1240,
    geplandeDoorlooptijdWeken: 11,
    werkelijkeDoorlooptijdWeken: 14,
    fases: [
      { fase: "engineering", geschatteUren: 160, werkelijkeUren: 240 },
      { fase: "assemblage", geschatteUren: 720, werkelijkeUren: 760 },
      { fase: "inbedrijfstelling", geschatteUren: 160, werkelijkeUren: 240 },
    ],
  },
  {
    id: "K2024-071",
    klant: "Akkermans Suikerwerk",
    machine: "Vulstation M60",
    jaar: 2024,
    omzet: 320000,
    margePercent: 17,
    totaalUren: 2780,
    geplandeDoorlooptijdWeken: 22,
    werkelijkeDoorlooptijdWeken: 22,
    fases: [
      { fase: "engineering", geschatteUren: 540, werkelijkeUren: 560 },
      { fase: "assemblage", geschatteUren: 1700, werkelijkeUren: 1720 },
      { fase: "inbedrijfstelling", geschatteUren: 440, werkelijkeUren: 500 },
    ],
  },
  {
    id: "K2024-068",
    klant: "Ravenstein Banket",
    machine: "Trayloader T15",
    jaar: 2024,
    omzet: 128000,
    margePercent: 19,
    totaalUren: 1080,
    geplandeDoorlooptijdWeken: 11,
    werkelijkeDoorlooptijdWeken: 12,
    fases: [
      { fase: "engineering", geschatteUren: 180, werkelijkeUren: 200 },
      { fase: "assemblage", geschatteUren: 680, werkelijkeUren: 680 },
      { fase: "inbedrijfstelling", geschatteUren: 180, werkelijkeUren: 200 },
    ],
  },
  {
    id: "K2024-064",
    klant: "Vink Diepvries",
    machine: "Sleevemachine S22",
    jaar: 2024,
    omzet: 198000,
    margePercent: 13,
    totaalUren: 1840,
    geplandeDoorlooptijdWeken: 15,
    werkelijkeDoorlooptijdWeken: 17,
    fases: [
      { fase: "engineering", geschatteUren: 280, werkelijkeUren: 360 },
      { fase: "assemblage", geschatteUren: 1180, werkelijkeUren: 1200 },
      { fase: "inbedrijfstelling", geschatteUren: 240, werkelijkeUren: 280 },
    ],
  },
  {
    id: "K2024-062",
    klant: "Smaakhuis Groothandel",
    machine: "Etiketteermachine E12",
    jaar: 2024,
    omzet: 94000,
    margePercent: 14,
    totaalUren: 820,
    geplandeDoorlooptijdWeken: 9,
    werkelijkeDoorlooptijdWeken: 10,
    fases: [
      { fase: "engineering", geschatteUren: 140, werkelijkeUren: 160 },
      { fase: "assemblage", geschatteUren: 520, werkelijkeUren: 520 },
      { fase: "inbedrijfstelling", geschatteUren: 120, werkelijkeUren: 140 },
    ],
  },
  {
    id: "K2024-059",
    klant: "Klaver Kruiden",
    machine: "Inpakrobot R5",
    jaar: 2024,
    omzet: 72000,
    margePercent: 26,
    totaalUren: 620,
    geplandeDoorlooptijdWeken: 8,
    werkelijkeDoorlooptijdWeken: 8,
    fases: [
      { fase: "engineering", geschatteUren: 100, werkelijkeUren: 100 },
      { fase: "assemblage", geschatteUren: 400, werkelijkeUren: 400 },
      { fase: "inbedrijfstelling", geschatteUren: 120, werkelijkeUren: 120 },
    ],
  },
];

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(0).replace("-", "−")}%`;
}

export function formatUren(value: number): string {
  return `${new Intl.NumberFormat("nl-NL").format(value)} uur`;
}

export function formatWeken(value: number): string {
  return value === 1 ? "1 week" : `${value} weken`;
}
