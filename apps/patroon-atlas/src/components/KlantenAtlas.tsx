"use client";

import { useState } from "react";
import type { Project } from "@/data/projecten";
import { KwadrantPlot } from "./KwadrantPlot";
import { ProjectTabel } from "./ProjectTabel";

type Props = {
  projecten: Project[];
};

export function KlantenAtlas({ projecten }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="bg-white rounded-xl border border-border-subtle p-4">
        <KwadrantPlot
          projecten={projecten}
          hoveredId={hoveredId}
          selectedId={selectedId}
          onHover={setHoveredId}
          onSelect={setSelectedId}
        />
        <p className="text-xs text-slate mt-3 max-w-prose">
          Elk punt is een project. Grootte van het punt = aantal bestede uren.
          De stippellijnen zijn de mediaan-waarden over de getoonde projecten —
          geen wet, alleen een leeshulp.
        </p>
      </div>
      <ProjectTabel
        projecten={projecten}
        hoveredId={hoveredId}
        selectedId={selectedId}
        onHover={setHoveredId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
