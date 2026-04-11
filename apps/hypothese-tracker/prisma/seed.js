const path = require("path");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { PrismaClient } = require("../node_modules/.prisma/client/index.js");

const dbPath = path.join(__dirname, "..", "data", "hypothese-tracker.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Verwijder bestaande data
  await prisma.besluitKpi.deleteMany();
  await prisma.screenshot.deleteMany();
  await prisma.review.deleteMany();
  await prisma.besluit.deleteMany();
  await prisma.kpi.deleteMany();

  // KPI's aanmaken
  const kpiProductie = await prisma.kpi.create({ data: { naam: "Productie-output" } });
  const kpiMarge = await prisma.kpi.create({ data: { naam: "Bruto marge" } });
  const kpiLevertijd = await prisma.kpi.create({ data: { naam: "Levertijd" } });
  const kpiUitval = await prisma.kpi.create({ data: { naam: "Uitvalpercentage" } });
  const kpiOmzet = await prisma.kpi.create({ data: { naam: "Omzet" } });

  // 1. Gesloten besluit — hypothese klopte
  const besluit1 = await prisma.besluit.create({
    data: {
      titel: "Normtijd Frame Type 7 verhogen",
      datumBesluit: new Date("2026-02-03"),
      actie: "Normtijd voor Frame Type 7 verhogen van 4,2 naar 5,0 uur per stuk. Planning en calculatie aanpassen.",
      hypothese: "Ik verwacht dat het uitvalpercentage op Frame Type 7 binnen 6 weken daalt van 12% naar onder 8%, omdat operators nu structureel te weinig tijd krijgen en daardoor fouten maken onder druk.",
      reviewdatum: new Date("2026-03-17"),
      status: "gereviewd",
      kpiLabels: {
        create: [
          { kpiId: kpiUitval.id },
          { kpiId: kpiProductie.id },
        ],
      },
    },
  });

  await prisma.review.create({
    data: {
      besluitId: besluit1.id,
      oordeel: "ja",
      geleerd: "Normtijden waren al jaren niet herzien. Uitval daalde naar 6,5%. Operators gaven aan dat de druk merkbaar lager was.",
      reviewdatumWerkelijk: new Date("2026-03-18"),
    },
  });

  // 2. Gesloten besluit — hypothese klopte deels
  const besluit2 = await prisma.besluit.create({
    data: {
      titel: "Minimum ordergrootte verhogen naar 50 stuks",
      datumBesluit: new Date("2026-01-15"),
      actie: "Minimum ordergrootte voor standaard onderdelen verhogen van 25 naar 50 stuks. Sales informeren, prijslijst aanpassen.",
      hypothese: "Ik verwacht dat de bruto marge op standaardorders binnen 3 maanden stijgt van 18% naar 22%, omdat we minder omsteltijd kwijt zijn per order.",
      reviewdatum: new Date("2026-04-01"),
      status: "gereviewd",
      kpiLabels: {
        create: [
          { kpiId: kpiMarge.id },
          { kpiId: kpiOmzet.id },
        ],
      },
    },
  });

  await prisma.review.create({
    data: {
      besluitId: besluit2.id,
      oordeel: "deels",
      geleerd: "Marge steeg naar 20,5% — beter, maar niet de 22% die we verwachtten. Twee grote klanten splitsen nu orders op om onder de 50 te blijven.",
      reviewdatumWerkelijk: new Date("2026-04-02"),
    },
  });

  // 3. Open besluit — klaar voor review
  await prisma.besluit.create({
    data: {
      titel: "Tweede planner inzetten op spoedorders",
      datumBesluit: new Date("2026-03-01"),
      actie: "Anja Hendriks parttime (3 dagen/week) inzetten als tweede planner specifiek voor spoedorders. Peter de Vries blijft de reguliere planning doen.",
      hypothese: "Ik verwacht dat de gemiddelde levertijd op spoedorders binnen 4 weken daalt van 8 naar 5 werkdagen, omdat de reguliere planning nu structureel verstoord wordt door ad-hoc spoedwerk.",
      reviewdatum: new Date("2026-04-01"),
      status: "open",
      kpiLabels: {
        create: [{ kpiId: kpiLevertijd.id }],
      },
    },
  });

  // 4. Open besluit — reviewdatum in de toekomst
  await prisma.besluit.create({
    data: {
      titel: "Bracket A12 outsourcen aan toeleverancier",
      datumBesluit: new Date("2026-03-20"),
      actie: "Productie van Bracket A12 volledig uitbesteden aan Janssen Metaaltechniek. Eigen capaciteit vrijmaken voor complexere onderdelen.",
      hypothese: "Ik verwacht dat de productie-output op complexe onderdelen binnen 6 weken stijgt met 15%, omdat we nu 20% van de CNC-capaciteit kwijt zijn aan een relatief simpel product.",
      reviewdatum: new Date("2026-05-15"),
      status: "open",
      kpiLabels: {
        create: [
          { kpiId: kpiProductie.id },
          { kpiId: kpiMarge.id },
        ],
      },
    },
  });

  // 5. Open besluit — reviewdatum verder in de toekomst
  await prisma.besluit.create({
    data: {
      titel: "Wekelijkse KPI-stand per mail aan teamleiders",
      datumBesluit: new Date("2026-04-07"),
      actie: "Elke maandagochtend automatisch een samenvatting van de belangrijkste KPI's mailen naar de vier teamleiders productie. Geen dashboard-link, maar de cijfers direct in de mail.",
      hypothese: "Ik verwacht dat de bespreking in het wekelijks productie-overleg binnen 4 weken meer datafocus krijgt, omdat teamleiders nu vaak niet naar het dashboard kijken voor de meeting.",
      reviewdatum: new Date("2026-05-05"),
      status: "open",
      kpiLabels: {
        create: [{ kpiId: kpiProductie.id }],
      },
    },
  });

  console.log("Seed-data aangemaakt voor Van Houten Metaal");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
