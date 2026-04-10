import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDatum, dagenVerschil } from "@/lib/format";

export const dynamic = "force-dynamic";

function oordeelIcoon(oordeel: string) {
  switch (oordeel) {
    case "ja":
      return <span className="text-success" title="Klopte">&#10003;</span>;
    case "deels":
      return <span className="text-warning" title="Deels">&#126;</span>;
    case "nee":
      return <span className="text-danger" title="Klopte niet">&#10007;</span>;
    default:
      return null;
  }
}

function statusLabel(reviewdatum: Date, status: string) {
  if (status === "gereviewd") return null;
  const dagen = dagenVerschil(reviewdatum);
  if (dagen <= 0) {
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-accent text-white">
        Te reviewen
      </span>
    );
  }
  return (
    <span className="text-xs text-muted">
      nog {dagen} {dagen === 1 ? "dag" : "dagen"}
    </span>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ kpi?: string }>;
}) {
  const { kpi } = await searchParams;

  const besluiten = await prisma.besluit.findMany({
    where: kpi
      ? { kpiLabels: { some: { kpi: { naam: kpi } } } }
      : undefined,
    include: {
      kpiLabels: { include: { kpi: true } },
      review: true,
      screenshots: true,
    },
    orderBy: { datumBesluit: "desc" },
  });

  const kpis = await prisma.kpi.findMany({ orderBy: { naam: "asc" } });

  // Sorteer: klaar voor review > open (op nabijheid reviewdatum) > gesloten
  const sorted = [...besluiten].sort((a, b) => {
    if (a.status === "open" && b.status === "gereviewd") return -1;
    if (a.status === "gereviewd" && b.status === "open") return 1;
    if (a.status === "open" && b.status === "open") {
      const aKlaar = dagenVerschil(a.reviewdatum) <= 0;
      const bKlaar = dagenVerschil(b.reviewdatum) <= 0;
      if (aKlaar && !bKlaar) return -1;
      if (!aKlaar && bKlaar) return 1;
      return dagenVerschil(a.reviewdatum) - dagenVerschil(b.reviewdatum);
    }
    return new Date(b.datumBesluit).getTime() - new Date(a.datumBesluit).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Besluiten</h1>
        <Link
          href="/nieuw"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Nieuw besluit
        </Link>
      </div>

      {kpis.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <Link
            href="/"
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              !kpi
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted hover:border-foreground"
            }`}
          >
            Alle
          </Link>
          {kpis.map((k) => (
            <Link
              key={k.id}
              href={`/?kpi=${encodeURIComponent(k.naam)}`}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                kpi === k.naam
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted hover:border-foreground"
              }`}
            >
              {k.naam}
            </Link>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="text-muted text-sm py-12 text-center">
          Nog geen besluiten vastgelegd.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {sorted.map((b) => (
            <Link
              key={b.id}
              href={`/besluit/${b.id}`}
              className="block py-4 hover:bg-surface/50 -mx-3 px-3 rounded-lg transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {b.status === "gereviewd" && b.review && (
                      <span className="text-lg leading-none">
                        {oordeelIcoon(b.review.oordeel)}
                      </span>
                    )}
                    <h2 className="font-medium truncate">{b.titel}</h2>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted">
                      {formatDatum(b.datumBesluit)}
                    </span>
                    {b.kpiLabels.map((kl) => (
                      <span
                        key={kl.kpiId}
                        className="text-xs px-2 py-0.5 rounded-full bg-border/50 text-muted"
                      >
                        {kl.kpi.naam}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {statusLabel(b.reviewdatum, b.status)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
