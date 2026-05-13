# Patroon-atlas

Een galerij van vier scatterplots over een fictieve machinebouwer. Bedoeld als demo voor maakbedrijven die hun operationele dashboards op orde hebben, maar de stap naar patroon-herkenning nog niet zelf maken.

Onderdeel van [datawijs-met-thijs](../../README.md).

## Wat het laat zien

Operationele dashboards beantwoorden vragen die je al hebt. Scatterplots stellen vragen die je nog niet had — door twee dimensies tegen elkaar uit te zetten en groepen zichtbaar te maken die in een tabel verstopt blijven.

Vier plots, elk een vraag:

1. **Klanten** — welke projecten verdienen, en welke kosten je geld?
2. **Doorlooptijd** — welke projecten lopen structureel uit?
3. **Projectfases** — waar lekken de uren binnen een project?
4. **Migratie** — welke klanten zijn anders dan vorig jaar?

Plot 1 staat uit; de andere drie zijn voor nu placeholders met de onderliggende vraag en een voorbeeld uit de data.

## Lokaal draaien

```bash
cd apps/patroon-atlas
npm install
npm run dev
```

Open <http://localhost:3000>.

Of via Docker, vanuit de repo-root:

```bash
docker compose up patroon-atlas
```

Dan draait het op <http://localhost:3335>.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 met de huisstijl-tokens uit `bvbv-canvas`
- `@visx/*` voor de scatterplot
- Geen database, geen opslag — alle data zit als TypeScript-fixture in `src/data/projecten.ts`

## Demo-data

Korver Machinebouw, een fictief familiebedrijf in Helmond dat special machines bouwt voor de voedingsmiddelenindustrie. ~120 FTE, project-organisatie. Alle klantnamen, projectcodes en getallen zijn verzonnen.

## Inspiratiebronnen

- [Tabular Editor — Building better scatterplots in Power BI](https://tabulareditor.com/blog/building-better-scatterplots-in-power-bi-reports)
- [SQLBI — Using scatterplots to find details in reports](https://www.sqlbi.com/articles/using-scatterplots-to-find-details-in-reports/)

## Licentie

[MIT](../../LICENSE).
