"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projecten";
import { formatEuro, formatPercent, formatUren } from "@/data/projecten";

type Props = {
  projecten: Project[];
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
};

export function ProjectTabel({
  projecten,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
}: Props) {
  const activeId = hoveredId ?? selectedId;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId || !containerRef.current) return;
    const row = containerRef.current.querySelector<HTMLElement>(
      `[data-row-id="${activeId}"]`,
    );
    if (row) {
      row.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  const sorted = [...projecten].sort((a, b) => b.omzet - a.omzet);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-xl border border-border-subtle overflow-auto max-h-[480px]"
    >
      <table className="w-full text-sm tabular">
        <thead className="sticky top-0 bg-white border-b border-border-subtle">
          <tr>
            <th className="text-left px-3 py-2 font-medium text-slate text-[11px] uppercase tracking-wider">
              Project
            </th>
            <th className="text-left px-3 py-2 font-medium text-slate text-[11px] uppercase tracking-wider">
              Klant
            </th>
            <th className="text-right px-3 py-2 font-medium text-slate text-[11px] uppercase tracking-wider">
              Omzet
            </th>
            <th className="text-right px-3 py-2 font-medium text-slate text-[11px] uppercase tracking-wider">
              Marge
            </th>
            <th className="text-right px-3 py-2 font-medium text-slate text-[11px] uppercase tracking-wider">
              Uren
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => {
            const isActive = activeId === p.id;
            const isFaded = activeId !== null && !isActive;
            const isNegative = p.margePercent < 0;
            return (
              <tr
                key={p.id}
                data-row-id={p.id}
                onMouseEnter={() => onHover(p.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(selectedId === p.id ? null : p.id)}
                className={`border-b border-border-subtle last:border-b-0 cursor-pointer transition-colors ${
                  isActive
                    ? "bg-amber-50"
                    : isFaded
                      ? "opacity-50"
                      : "hover:bg-ink-50"
                }`}
                style={{
                  backgroundColor: isActive ? "#FBEBC9" : undefined,
                }}
              >
                <td className="px-3 py-2 text-ink font-medium">{p.id}</td>
                <td className="px-3 py-2 text-ink">
                  {p.klant}
                  <div className="text-xs text-slate">{p.machine}</div>
                </td>
                <td className="px-3 py-2 text-right text-ink">
                  {formatEuro(p.omzet)}
                </td>
                <td
                  className="px-3 py-2 text-right"
                  style={{ color: isNegative ? "#A2382B" : undefined }}
                >
                  {formatPercent(p.margePercent)}
                </td>
                <td className="px-3 py-2 text-right text-slate">
                  {formatUren(p.totaalUren)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
