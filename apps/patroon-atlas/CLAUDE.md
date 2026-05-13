# Patroon-atlas

> Lees eerst de root [CLAUDE.md](../../CLAUDE.md) voor de gedeelde context (doelgroep, stijl, principes, werkwijze). Dit document bevat alleen wat specifiek is voor deze app.

## Wat dit appje is

Een galerij van vier scatterplots over een fictieve machinebouwer (Korver Machinebouw, Helmond). Bedoeld als demo voor maakbedrijven van 50–200 FTE die hun operationele dashboards op orde hebben, maar de stap naar patroon-herkenning nog niet zelf maken.

Het appje is niet zelf een tool met opslag — het is een visueel essay. Klikbare scatterplots gekoppeld aan een detail-tabel, met per plot een leeswijzer.

## Waarom dit appje bestaat

Een operationeel dashboard beantwoordt vragen die je al hebt — omzet deze maand, voorraad nu, doorlooptijd vorige week. Scatterplots doen iets anders: ze stellen vragen die je nog niet had door twee dimensies tegen elkaar uit te zetten en groepen zichtbaar te maken die in een tabel verstopt blijven.

Voor de doelgroep (BI-persoon-aanwezig, geavanceerdere analyse afwezig) is dit precies het niveau dat tastbaar moet worden: zie wat scatterplots kunnen, vergelijkbaar met wat in een Power BI-rapport haalbaar is, met dezelfde data die ze al hebben.

## De vier plots

| Nr | Pad | Vraag | Status |
|---|---|---|---|
| 01 | `/klanten` | Welke projecten verdienen, en welke kosten je geld? (omzet × marge, bubble = uren) | klaar |
| 02 | `/doorlooptijd` | Welke projecten lopen structureel uit? (geplande × werkelijke doorlooptijd) | placeholder |
| 03 | `/fases` | Waar lekken de uren binnen een project? (per fase: geschat × werkelijk) | placeholder |
| 04 | `/migratie` | Welke klanten zijn anders dan vorig jaar? (2024 → 2025 met pijltjes) | placeholder |

Plot 4 is de wow-plot: kwadrant-migratie over twee jaren is moeilijk in standaard dashboards te repliceren en levert het sterkste &ldquo;dat zou ik willen&rdquo;-moment op.

## Inspiratiebronnen

- [Tabular Editor — Building better scatterplots in Power BI](https://tabulareditor.com/blog/building-better-scatterplots-in-power-bi-reports): de kwadrant-strategie als &ldquo;decision map&rdquo;, met de belangrijke caveat dat de grenslijn een leeshulp is, geen wet.
- [SQLBI — Using scatterplots to find details in reports](https://www.sqlbi.com/articles/using-scatterplots-to-find-details-in-reports/): scatterplot als visuele index die je via crossfilter naar een detail-tabel leidt. Dat is het hoofdmechaniek hier.

## Wat dit appje expliciet NIET doet

Naast de gedeelde &ldquo;wat appjes niet zijn&rdquo;-lijst uit de root CLAUDE.md, specifiek voor deze app:

- Geen opslag. Geen accounts. Geen notities. Het is een leesbare demo, geen logboek.
- Geen filters of dropdowns. Geen tijdkiezers. Per pagina één plot, één tabel, één leeswijzer.
- Geen tooltip-cards die over de plot zweven. De detail-tabel doet dat werk — rustiger en consistent.
- Geen export, geen delen-knop, geen rapport-PDF.

## Demo-data

Korver Machinebouw, ~120 FTE, special-machinebouwer voor de voedingsmiddelenindustrie. Project-organisatie met drie fasen: engineering, assemblage, inbedrijfstelling.

- 12 fictieve klanten (Brouwer Sauzen, De Vegter Vleeswaren, Hoogland Zuivel, ...)
- 13 projecten in 2025, 12 in 2024
- Project-codes: K2024-XXX, K2025-XXX
- Machine-typen: Vulstation, Sleevemachine, Trayloader, Stretchwikkelaar, Etiketteermachine, Verpakkingslijn, Inpakrobot
- Bedragen €72k tot €420k, marges −3% tot +28%

Alle data zit als TypeScript-fixture in `src/data/projecten.ts`. Geen seed-flow, geen DB, geen runtime-generator.

## Stack

| Onderdeel | Keuze |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Charting | `@visx/*` 3.12 (scale, axis, shape, group, text) |
| Styling | Tailwind CSS 4 met design-tokens uit `bvbv-canvas` (kleuren, Roboto) |
| State | `useState` per plot-pagina, geen externe store |
| Data | Statische TypeScript-fixtures, geen database |
| Draaien | `npm run dev` of `docker compose up patroon-atlas` |

`legacy-peer-deps=true` in `.npmrc` omdat visx 3.x op React 18 peer dep zit; React 19 werkt in praktijk prima.

## Design-tokens

De huisstijl volgt `bvbv-canvas/assets/tokens.css`:

- Achtergrond: warm cream (`#FDF8F0`)
- Inkt: warme bijna-zwart (`#1D0C0C`)
- Accent: amber (`#F2B969`)
- Signalen: muted-groen (`#3F7D4E`) en terracotta (`#A2382B`)
- Font: Roboto

Niet Linear/Notion-koel maar warm Nederlands familiebedrijf. Past bij de doelgroep.

## Vervolg

Plot 1 staat. Plot 2 / 3 / 4 zijn placeholders die uitleggen wat ze willen tonen. Volgorde van uitwerken:

1. Plot 4 (migratie) — meeste demo-kracht, technisch het meest uitdagend
2. Plot 2 (doorlooptijd) — simpel, makkelijke uitbreiding van plot 1
3. Plot 3 (fases) — kleur per fase, drie sub-categorieën in één plot
