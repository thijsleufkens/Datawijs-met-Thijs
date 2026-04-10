"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ScreenshotUpload from "@/components/screenshot-upload";
import type { Besluit } from "@/lib/types";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [besluit, setBesluit] = useState<Besluit | null>(null);
  const [oordeel, setOordeel] = useState<string>("");
  const [geleerd, setGeleerd] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/besluiten/${id}`)
      .then((r) => r.json())
      .then(setBesluit);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oordeel) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/besluiten/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oordeel,
          geleerd,
          screenshotFilenames: screenshots,
        }),
      });

      if (res.ok) {
        router.push(`/besluit/${id}`);
      }
    } finally {
      setSaving(false);
    }
  };

  if (!besluit) {
    return <p className="text-sm text-muted">Laden...</p>;
  }

  const nulmetingScreenshots = besluit.screenshots.filter(
    (s) => s.type === "nulmeting"
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Reviewen</h1>

      <div className="bg-surface border border-border rounded-lg p-4 mb-8">
        <h2 className="font-medium">{besluit.titel}</h2>
        <p className="text-sm text-muted mt-1">
          <strong>Actie:</strong> {besluit.actie}
        </p>
        <p className="text-sm text-muted mt-1 italic">
          <strong className="not-italic">Hypothese:</strong>{" "}
          {besluit.hypothese}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium mb-2">
              Nulmeting (toen)
            </h2>
            {nulmetingScreenshots.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {nulmetingScreenshots.map((s) => (
                  <img
                    key={s.id}
                    src={`/api/upload/${s.filename}`}
                    alt="Nulmeting"
                    className="h-40 rounded border border-border object-cover"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Geen screenshots</p>
            )}
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2">
              Huidige stand (nu)
            </h2>
            <ScreenshotUpload
              filenames={screenshots}
              onChange={setScreenshots}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Klopte de hypothese?
          </label>
          <div className="flex gap-3">
            {[
              { value: "ja", label: "Klopte", kleur: "border-success text-success hover:bg-success/10" },
              { value: "deels", label: "Deels", kleur: "border-warning text-warning hover:bg-warning/10" },
              { value: "nee", label: "Klopte niet", kleur: "border-danger text-danger hover:bg-danger/10" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setOordeel(opt.value)}
                className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  oordeel === opt.value
                    ? `${opt.kleur} bg-${opt.value === "ja" ? "success" : opt.value === "deels" ? "warning" : "danger"}/10`
                    : `border-border text-muted hover:${opt.kleur}`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Wat heb je geleerd?
          </label>
          <textarea
            value={geleerd}
            onChange={(e) => setGeleerd(e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="Kort en bondig, max 200 tekens"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
          />
          <p className="text-xs text-muted mt-1 text-right">
            {geleerd.length}/200
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving || !oordeel}
            className="rounded-lg bg-foreground text-background px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Opslaan..." : "Review opslaan"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/besluit/${id}`)}
            className="rounded-lg border border-border px-6 py-2 text-sm text-muted hover:border-foreground transition-colors"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}
