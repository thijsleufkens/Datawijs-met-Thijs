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

**Wat ik geleerd heb:** Eerste versie was Next.js + visx + Docker, omdat hypothese-tracker en pov-wizard die stack ook gebruiken. Na de eerste werkende plot kwam de vraag of dit niet veel lichter kan: scatterplots hebben geen opslag, geen state om te persisteren, geen server-logica. Tweede versie is daarom statisch: vijf HTML-bestanden, vanilla CSS, vanilla JS dat inline SVG genereert. Volgt de pattern van bvbv-canvas — geen build-step, geen package.json, geen Docker. Het inruilen van visx voor zelf-geschreven SVG kost ~150 regels per plot maar geeft volledige controle over pijltjes en kwadrant-overlays (nodig voor plot 4). Belangrijker nog: het past bij de root-vuistregel *Eenvoud > volledigheid*, en bij hoe Thijs zijn andere statische experimenten (BVBV Canvas) al inricht. De Next.js-versie is volledig vervangen; de tekstinhoud, demo-data en visuele keuzes reisden ongewijzigd mee.

**Derde verschuiving — eigen repo:** GitHub Pages serveert alleen vanaf `/` of `/docs` op een branch, niet vanuit een willekeurige subfolder. Voor een statische app in een monorepo betekent dat: óf eigen repo, óf alle apps verhuizen naar `/docs`, óf een gh-pages-deploy-workflow. De eigen-repo-variant matcht het bvbv-canvas-patroon exact (`thijsleufkens.github.io/<repo>/`) en is voor één app vrijwel zonder overhead. De bestanden zijn daarom uit deze monorepo verwijderd; ze blijven volledig in git-history bewaard. Bootstrap van de nieuwe repo gebeurt via `git archive` (zie commit-bericht voor de exacte commando's).
