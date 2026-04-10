# Hypothese-tracker

> Onderdeel van [Datawijs met Thijs](../../README.md) — eerste burger van het *Decision OS*-concept.

Een tool die tijdens een KPI-meeting een besluit vastlegt — inclusief de hypothese erachter en een nulmeting via screenshot — en op een afgesproken reviewmoment helpt te kijken of het besluit het verwachte effect had.

## Het idee

Dashboards tonen wat er gebeurd is. Maar de *waarom* en de *verwachting* achter besluiten verdampen binnen twee weken. De Hypothese-tracker vangt op het moment van besluiten drie dingen — wat gaan we doen, wat verwachten we dat er gebeurt, en hoe staat het er nu voor — en pingt op een afgesproken datum terug om te kijken of het klopte.

Niet om af te rekenen. Om patronen zichtbaar te maken: waar zit ons MT er structureel naast, en wat zegt dat over hoe we de business begrijpen?

## Stack

| Onderdeel | Keuze |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Data | SQLite via Prisma 7 + better-sqlite3 adapter |
| Screenshots | Lokaal bestandssysteem (`data/uploads/`) |
| Styling | Tailwind CSS 4 |
| Draaien | Docker Compose of `npm run dev` |

## Lokaal draaien

```bash
cd apps/hypothese-tracker
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

Vanuit de root van de repository:

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000).

## Demo-data

De seed bevat 5 voorbeeldbesluiten van het fictieve bedrijf Van Houten Metaal:
- 2 gesloten besluiten (1x "klopte", 1x "deels")
- 1 open besluit klaar voor review
- 2 open besluiten met toekomstige reviewdatum

## Status

Eerste werkende versie. Alle vier de schermen zijn gebouwd:
1. Besluitenlijst met KPI-filter en sortering
2. Nieuw besluit formulier met screenshot-upload en Mad Libs-placeholder
3. Besluit-detail met voor/na vergelijking
4. Review formulier met oordeel-knoppen
