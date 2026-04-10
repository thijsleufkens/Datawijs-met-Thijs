"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScreenshotUpload from "@/components/screenshot-upload";
import KpiSelect from "@/components/kpi-select";

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function NieuwBesluit() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [titel, setTitel] = useState("");
  const [datumBesluit, setDatumBesluit] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [actie, setActie] = useState("");
  const [hypothese, setHypothese] = useState("");
  const [reviewdatum, setReviewdatum] = useState(addDays(14));
  const [kpiLabels, setKpiLabels] = useState<string[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/besluiten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titel,
          datumBesluit,
          actie,
          hypothese,
          reviewdatum,
          kpiLabels,
          screenshotFilenames: screenshots,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-8">
        Nieuw besluit
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <input
            type="text"
            required
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            placeholder='bijv. "Normtijd Frame Type 7 verhogen"'
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Datum besluit
          </label>
          <input
            type="date"
            required
            value={datumBesluit}
            onChange={(e) => setDatumBesluit(e.target.value)}
            className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">KPI-labels</label>
          <KpiSelect selected={kpiLabels} onChange={setKpiLabels} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Actie — wat gaan we concreet doen?
          </label>
          <textarea
            required
            value={actie}
            onChange={(e) => setActie(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hypothese</label>
          <textarea
            required
            value={hypothese}
            onChange={(e) => setHypothese(e.target.value)}
            rows={3}
            placeholder="Ik verwacht dat [KPI] over [periode] zal [stijgen/dalen] van [X] naar [Y], omdat [redenering]."
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y italic placeholder:not-italic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reviewdatum</label>
          <div className="flex items-center gap-3">
            <input
              type="date"
              required
              value={reviewdatum}
              onChange={(e) => setReviewdatum(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
            <div className="flex gap-2">
              {[
                { label: "+2 wkn", days: 14 },
                { label: "+4 wkn", days: 28 },
                { label: "+6 wkn", days: 42 },
                { label: "+3 mnd", days: 90 },
              ].map((s) => (
                <button
                  key={s.days}
                  type="button"
                  onClick={() => setReviewdatum(addDays(s.days))}
                  className="text-xs px-2 py-1 rounded border border-border text-muted hover:border-foreground transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Nulmeting-screenshots
          </label>
          <ScreenshotUpload filenames={screenshots} onChange={setScreenshots} />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-foreground text-background px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Opslaan..." : "Opslaan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg border border-border px-6 py-2 text-sm text-muted hover:border-foreground transition-colors"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}
