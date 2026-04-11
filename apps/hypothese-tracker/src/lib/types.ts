export interface KpiLabel {
  besluitId: string;
  kpiId: string;
  kpi: { id: string; naam: string };
}

export interface Screenshot {
  id: string;
  filename: string;
  type: "nulmeting" | "review";
}

export interface Review {
  id: string;
  oordeel: "ja" | "deels" | "nee";
  geleerd: string;
  reviewdatumWerkelijk: string;
  screenshots: Screenshot[];
}

export interface Besluit {
  id: string;
  titel: string;
  datumBesluit: string;
  actie: string;
  hypothese: string;
  reviewdatum: string;
  status: "open" | "gereviewd";
  kpiLabels: KpiLabel[];
  screenshots: Screenshot[];
  review: Review | null;
}
