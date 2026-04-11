"use client";

import { usePathname } from "next/navigation";
import { ProgressBar } from "./progress-bar";

const STAPPEN = [
  { pad: "/wizard/observatie", label: "Observatie" },
  { pad: "/wizard/karakters", label: "Karakters" },
  { pad: "/wizard/actie", label: "Actie" },
  { pad: "/wizard/inzet", label: "Inzet" },
  { pad: "/wizard/synthese", label: "Synthese" },
];

export function WizardProgressWrapper() {
  const pathname = usePathname();
  const huidigIndex = STAPPEN.findIndex((s) => s.pad === pathname);
  const huidigStap = huidigIndex >= 0 ? huidigIndex + 1 : 1;

  return (
    <ProgressBar
      stap={huidigStap}
      totaal={STAPPEN.length}
      labels={STAPPEN.map((s) => s.label)}
    />
  );
}
