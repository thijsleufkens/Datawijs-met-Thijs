import Link from "next/link";

const plots = [
  {
    nr: "01",
    href: "/klanten",
    titel: "Welke projecten verdienen, en welke kosten je geld?",
    samenvatting:
      "Omzet tegen marge per project, met de mediaan als leeshulp. De grootte van elk punt verraadt waar de uren zitten.",
    status: "klaar" as const,
  },
  {
    nr: "02",
    href: "/doorlooptijd",
    titel: "Welke projecten lopen structureel uit?",
    samenvatting:
      "Geplande versus werkelijke doorlooptijd. Wat in een KPI verstopt zit als een gemiddelde, valt hier uiteen in twee groepen.",
    status: "binnenkort" as const,
  },
  {
    nr: "03",
    href: "/fases",
    titel: "Waar lekken de uren binnen een project?",
    samenvatting:
      "Per fase — engineering, assemblage, inbedrijfstelling — de geschatte uren tegen de werkelijke. Soms wijst één fase consistent omhoog.",
    status: "binnenkort" as const,
  },
  {
    nr: "04",
    href: "/migratie",
    titel: "Welke klanten zijn anders dan vorig jaar?",
    samenvatting:
      "Dezelfde klanten in twee jaren, met pijltjes ertussen. Een patroon dat in standaard dashboards bijna nooit zichtbaar wordt.",
    status: "binnenkort" as const,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium mb-3">
          Patroon-atlas
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-ink leading-tight mb-4">
          Wat je in een scatterplot ziet, en in een KPI-tabel mist.
        </h1>
        <p className="text-lg text-slate leading-relaxed">
          Vier scatterplots, gemaakt rond een fictieve machinebouwer in
          Helmond. Bedoeld voor bedrijven met hun operationele dashboards op
          orde, die merken dat dezelfde grafieken niet meer nieuwe inzichten
          opleveren. Elke plot probeert één vraag te beantwoorden die je in
          een standaard rapport zelden gesteld ziet.
        </p>
      </header>

      <section className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plots.map((p) => {
            const isReady = p.status === "klaar";
            const Card = (
              <article
                className={`bg-white rounded-xl border border-border-subtle p-6 h-full transition-all ${
                  isReady
                    ? "hover:border-amber-300 hover:shadow-sm cursor-pointer"
                    : "opacity-70"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium">
                    Plot {p.nr}
                  </span>
                  {!isReady && (
                    <span className="text-[11px] uppercase tracking-wider text-slate">
                      binnenkort
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-ink leading-snug mb-2">
                  {p.titel}
                </h2>
                <p className="text-sm text-slate leading-relaxed">
                  {p.samenvatting}
                </p>
              </article>
            );
            return isReady ? (
              <Link key={p.nr} href={p.href} className="block">
                {Card}
              </Link>
            ) : (
              <div key={p.nr}>{Card}</div>
            );
          })}
        </div>
      </section>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium">
          Waarom deze atlas
        </h2>
        <p className="text-slate leading-relaxed">
          Scatterplots staan zelden in operationele dashboards. Niet omdat ze
          ingewikkeld zijn, maar omdat ze ander werk vragen: tabellen
          beantwoorden vragen die je al hebt, scatterplots stellen vragen die
          je nog niet had. Dat past slechter bij een dagelijkse stuur-cyclus,
          maar beter bij een MT- of staf-overleg.
        </p>
        <p className="text-slate leading-relaxed">
          Deze appjes maken niet meer of mooiere dashboards. Ze maken
          tastbaar wat er nog meer met dezelfde data kan, voor wie bereid is
          om er een uur per maand stil bij te staan.
        </p>
      </section>
    </div>
  );
}
