import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDatum } from "@/lib/format";

export const dynamic = "force-dynamic";

function oordeelLabel(oordeel: string) {
  switch (oordeel) {
    case "ja":
      return "Klopte";
    case "deels":
      return "Deels";
    case "nee":
      return "Klopte niet";
    default:
      return oordeel;
  }
}

function oordeelKleur(oordeel: string) {
  switch (oordeel) {
    case "ja":
      return "text-success";
    case "deels":
      return "text-warning";
    case "nee":
      return "text-danger";
    default:
      return "";
  }
}

export default async function BesluitDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const besluit = await prisma.besluit.findUnique({
    where: { id },
    include: {
      kpiLabels: { include: { kpi: true } },
      screenshots: true,
      review: { include: { screenshots: true } },
    },
  });

  if (!besluit) notFound();

  const nulmetingScreenshots = besluit.screenshots.filter(
    (s) => s.type === "nulmeting"
  );
  const reviewScreenshots = besluit.review?.screenshots ?? [];

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        &larr; Terug naar overzicht
      </Link>

      <div className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {besluit.titel}
          </h1>
          {besluit.status === "open" && (
            <Link
              href={`/besluit/${besluit.id}/review`}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Reviewen
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-muted">
            {formatDatum(besluit.datumBesluit)}
          </span>
          {besluit.kpiLabels.map((kl) => (
            <span
              key={kl.kpiId}
              className="text-xs px-2 py-0.5 rounded-full bg-border/50 text-muted"
            >
              {kl.kpi.naam}
            </span>
          ))}
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              besluit.status === "open"
                ? "bg-accent/10 text-accent"
                : "bg-foreground/10 text-foreground"
            }`}
          >
            {besluit.status === "open" ? "Open" : "Gereviewd"}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-sm font-medium text-muted mb-1">Actie</h2>
          <p className="text-sm whitespace-pre-wrap">{besluit.actie}</p>
        </section>

        <section>
          <h2 className="text-sm font-medium text-muted mb-1">Hypothese</h2>
          <p className="text-sm whitespace-pre-wrap italic">
            {besluit.hypothese}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-medium text-muted mb-1">Reviewdatum</h2>
          <p className="text-sm">{formatDatum(besluit.reviewdatum)}</p>
        </section>

        {nulmetingScreenshots.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted mb-2">
              Nulmeting
            </h2>
            <div className="flex gap-3 flex-wrap">
              {nulmetingScreenshots.map((s) => (
                <a
                  key={s.id}
                  href={`/api/upload/${s.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`/api/upload/${s.filename}`}
                    alt="Nulmeting screenshot"
                    className="h-40 rounded border border-border object-cover hover:opacity-90 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {besluit.status === "gereviewd" && besluit.review && (
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Review</h2>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted">Oordeel: </span>
              <span
                className={`text-sm font-semibold ${oordeelKleur(
                  besluit.review.oordeel
                )}`}
              >
                {oordeelLabel(besluit.review.oordeel)}
              </span>
            </div>

            {besluit.review.geleerd && (
              <div>
                <h3 className="text-sm font-medium text-muted mb-1">
                  Wat hebben we geleerd?
                </h3>
                <p className="text-sm whitespace-pre-wrap">
                  {besluit.review.geleerd}
                </p>
              </div>
            )}

            <div>
              <span className="text-sm text-muted">
                Gereviewd op{" "}
                {formatDatum(besluit.review.reviewdatumWerkelijk)}
              </span>
            </div>

            {nulmetingScreenshots.length > 0 ||
            reviewScreenshots.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-muted mb-2">
                    Voor (nulmeting)
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {nulmetingScreenshots.map((s) => (
                      <a
                        key={s.id}
                        href={`/api/upload/${s.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`/api/upload/${s.filename}`}
                          alt="Nulmeting"
                          className="h-32 rounded border border-border object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted mb-2">
                    Na (review)
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {reviewScreenshots.map((s) => (
                      <a
                        key={s.id}
                        href={`/api/upload/${s.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`/api/upload/${s.filename}`}
                          alt="Review"
                          className="h-32 rounded border border-border object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
