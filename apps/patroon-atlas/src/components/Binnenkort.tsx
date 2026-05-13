type Props = {
  nummer: string;
  titel: string;
  vraag: string;
  beschrijving: string;
  voorbeeld: string;
};

export function Binnenkort({
  nummer,
  titel,
  vraag,
  beschrijving,
  voorbeeld,
}: Props) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <div className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium mb-2">
          Plot {nummer} — {titel}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-ink mb-3">
          {vraag}
        </h1>
        <p className="text-slate leading-relaxed">{beschrijving}</p>
      </div>

      <div className="bg-white rounded-xl border border-border-subtle p-6">
        <div className="text-[11px] uppercase tracking-[0.08em] text-slate font-medium mb-2">
          Binnenkort
        </div>
        <p className="text-ink leading-relaxed mb-4">
          Deze plot is nog niet uitgewerkt. Plot 1 (Klanten) staat als
          eerste; deze drie volgen.
        </p>
        <div className="text-sm text-slate leading-relaxed border-t border-border-subtle pt-4">
          <span className="font-medium text-ink">Voorbeeld:</span> {voorbeeld}
        </div>
      </div>
    </div>
  );
}
