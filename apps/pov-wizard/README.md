# POV Wizard

Een begeleide flow die je helpt om van een afwijking op een dashboard naar een scherpe mening te komen. Vijf schermen, één zin, klaar.

Onderdeel van [datawijs-met-thijs](../../README.md).

## Wat het doet

Je ziet iets geks in een KPI. In plaats van het weg te klikken of er alleen maar naar te staren, loopt deze wizard je langs vijf vragen:

1. Wat zie je precies?
1. Wie wordt hierdoor geraakt, en wat zit het in de weg?
1. Wat stel je voor om te doen?
1. Wat kost het als we niets doen?
1. Zet het in één zin.

Aan het eind heb je een Data POV: een zin die je kunt gebruiken in een mailtje, een MT-overleg, of als basis voor een hypothese die je later wilt toetsen.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Demo

Klik op de landingspagina op **Vul voorbeeld in** om een scenario te zien van Van Houten Metaal, een fictief metaalbewerkingsbedrijf.

## Stack

Next.js, TypeScript, Tailwind CSS v4, Zustand. Geen backend, geen database.

## Achtergrond

De structuur komt uit Nancy Duarte's DataStory-methodiek, waarin een sterke Data POV bestaat uit een observatie, een actie, en de inzet. De wizard dwingt deze drie componenten af zonder dat de gebruiker het boek hoeft te lezen.
