import { KlantenAtlas } from "@/components/KlantenAtlas";
import { projecten } from "@/data/projecten";

export default function KlantenPage() {
  const projecten2025 = projecten.filter((p) => p.jaar === 2025);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium mb-2">
          Plot 1 — Kwadranten
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-ink mb-3">
          Welke projecten verdienen, en welke kosten je geld?
        </h1>
        <p className="text-slate max-w-prose leading-relaxed">
          Een operationeel dashboard toont marge per maand of per project,
          meestal in een tabel of bar chart. Wat het niet laat zien: hoe een
          project zich verhoudt tot de rest. Door omzet tegen marge uit te
          zetten, vallen vier groepen op die in het MT elk een ander gesprek
          verdienen.
        </p>
      </div>

      <KlantenAtlas projecten={projecten2025} />

      <div className="bg-white rounded-xl border border-border-subtle p-5 max-w-3xl">
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium mb-2">
          Hoe lees je deze plot
        </h2>
        <ul className="text-sm text-ink space-y-2 leading-relaxed">
          <li>
            <span className="font-medium">Rechtsboven</span> — grote, gezonde
            projecten. Begrijpen waarom dit werkt is meer waard dan
            optimaliseren.
          </li>
          <li>
            <span className="font-medium">Rechtsonder</span> — grote
            projecten met krappe marge. Hier zit het risico dat het MT
            structureel onderschat: omzet verhult de marge-druk.
          </li>
          <li>
            <span className="font-medium">Linksboven</span> — kleine
            projecten met goede marge. Vaak overgeslagen, soms onterecht.
          </li>
          <li>
            <span className="font-medium">Linksonder</span> — klein én
            marge-arm. Kandidaat voor &ldquo;waarom doen we dit eigenlijk
            nog?&rdquo;.
          </li>
        </ul>
        <p className="text-xs text-slate mt-4 leading-relaxed">
          De lijnen zijn medianen, geen drempelwaarden. Een project net onder
          de marge-lijn is niet wezenlijk anders dan eentje net erboven. Wat de
          plot doet is je oog sturen naar waar het gesprek het meeste oplevert.
        </p>
      </div>
    </div>
  );
}
