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
