# Leerlogboek

Per appje één paragraaf: wat wilde ik testen, wat heb ik gebouwd, wat vonden mensen ervan, wat heb ik geleerd. Dit is de meta-versie van wat sommige appjes zelf doen, en bedoeld om over een jaar terug te kijken op wat wel en niet werkte.

## Hypothese-tracker

*Status: eerste werkende versie*

**Wat ik wil testen:** of het expliciet vastleggen van een besluit met hypothese en nulmeting, en het later terughalen daarvan, leidt tot beter gesprek in een MT. Hypothese: ja, omdat het de cognitieve kosten van "waarom besloten we dit ook alweer" wegneemt en mensen dwingt scherp te zijn over verwachtingen.

**Wat ik heb gebouwd:** Next.js app met vier schermen (besluitenlijst, nieuw besluit, detail, review). SQLite via Prisma voor data, screenshot-upload naar lokaal bestandssysteem. Docker-setup voor lokaal draaien en later deployment. Demo-data met 5 voorbeeldbesluiten van Van Houten Metaal.

**Wat anderen ervan vonden:** —

**Wat ik geleerd heb:** Prisma v7 is een flinke stap ten opzichte van v6 — de nieuwe `prisma-client` generator is ESM-only en vereist een driver adapter (better-sqlite3) in plaats van de ingebouwde engine. Kost even uitzoeken, maar werkt uiteindelijk goed. Next.js standalone output werkt prima met Docker.

## POV Wizard

*Status: eerste werkende versie*

**Wat ik wil testen:** of een gestructureerde wizard die de Data POV-structuur (observatie + actie + inzet) oplegt, medewerkers helpt om van een ruwe dashboardobservatie naar een verdedigbare mening te komen. Hypothese: door de denkstructuur in te bakken als invulformulier wordt de cognitieve drempel laag genoeg dat het in de praktijk ook wordt gedaan.

**Wat ik heb gebouwd:** Next.js app zonder backend. Vijf wizardschermen, Zustand-store met localStorage-persistentie, automatische samenstelling van de POV-zin, en drie deterministische kwaliteitschecks (gebiedende wijs, kwantificeerbare impact, horizon). Demo-data op basis van Van Houten Metaal.

**Wat anderen ervan vonden:** —

**Wat ik geleerd heb:** Zustand met de persist-middleware is in drie regels gereed en werkt foutloos over paginaherlading heen. De App Router maakt het lastig om de huidige route in een layout te lezen — een aparte client-wrapper voor de voortgangsbalk lost dat netjes op.

## Patroon-atlas

*Status: plot 1 staat, plots 2-4 als placeholders*

**Wat ik wil testen:** of een galerij van scatterplots met klikbare detail-tabel als demo werkt richting prospects die hun operationele dashboards op orde hebben, maar de stap naar patroon-herkenning niet zelf maken. Hypothese: scatterplots maken tastbaar wat &ldquo;geavanceerdere analyse&rdquo; concreet kan zijn — niet als een magische AI-belofte, maar als rapport-patronen die met dezelfde data ook in Power BI haalbaar zijn.

**Wat ik heb gebouwd:** Next.js app zonder backend, met statische TypeScript-fixtures voor een fictief familiebedrijf (Korver Machinebouw, machinebouw voor voedingsmiddelen). Plot 1 is een omzet × marge-scatter per project met bubble-grootte op uren, gekoppeld aan een detail-tabel via gedeelde hover/select-state. Plots 2-4 zijn placeholders met hun onderliggende vraag en een voorbeeld uit de data. De huisstijl is overgenomen uit `bvbv-canvas/tokens.css` — warm cream, amber-accent, Roboto — niet de standaard Linear/Notion-koele stijl.

**Wat anderen ervan vonden:** —

**Wat ik geleerd heb:** Visx 3.12 zit nog op React 18 als peer dependency; React 19 werkt prima maar vereist `legacy-peer-deps=true` in `.npmrc`. Het bouwen van scatterplots in visx is laag-niveau (je krijgt assen en schalen, maar geen plot-component) — fijn voor controle over kleur en kwadrant-overlays, maar dit zou met Recharts in minder regels kunnen. Voor plot 4 (migratie met pijltjes) zal die controle juist nodig zijn. De inspiratie uit het BVBV-canvas heeft echt verschil gemaakt: de eerste versie met Linear-koele kleuren voelde uitwisselbaar; met de DMT-tokens kreeg het meteen het juiste merk-gevoel.
