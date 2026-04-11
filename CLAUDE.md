# Datawijs met Thijs — gedeelde context voor Claude Code

Deze CLAUDE.md geldt voor de hele repo. Per appje is er een eigen CLAUDE.md in `apps/<naam>/` die hierop voortbouwt.

## Wat dit is

Een verzameling experimentele appjes rond besluitvorming in de Nederlandse maakindustrie. Het overkoepelende werknaam-concept heet *Decision OS*: een schil rond Power BI-dashboards die de zachte kant van besluitvorming vangt — context, hypothesen, anekdotes, geleerde lessen.

Geen producten, geen startup. Experimenten met richting. Bedoeld als gesprekstof en bewijsmateriaal richting prospects.

## Wie de bouwer is

Thijs Leufkens, solo BI-consultant in Venlo. 15+ jaar ervaring als senior data/BI specialist (SAP, Dynamics, Power BI, SQL, DAX, Power Query, Kimball-modellering). Achtergrond in productieplanning bij ASML, daarna consulting bij maakbedrijven (Marel, Uniper, IXON, DAF). Positioneert zichzelf als *de tolk tussen techniek en bedrijfskunde*. Minder ervaring met moderne webframeworks, maar leert snel.

## Doelgroep van de appjes

- Nederlandse maakbedrijven, 50–200 medewerkers
- Finance directors, controllers, operations managers, plant managers
- Mensen die dagelijks met Power BI werken maar merken dat dashboards niet genoeg zijn

## Conceptuele basis

De appjes leunen op *resource rationality* (Griffiths, Lieder & Griffiths). Mensen in maakbedrijven zijn niet irrationeel — ze opereren onder cognitieve kostendruk. Het reconstrueren van context rond eerdere besluiten, het expliciet maken van hypotheses, het vangen van anekdotes naast cijfers: dat kost moeite en gebeurt daarom niet. De appjes verlagen die kosten tot bijna nul, zodat bestaande heuristieken beter werken.

Centrale gedachte: *we vangen wat anders verdampt*.

## Stijl en toon

Geldt voor alle UI-teksten, README's, commit messages en code-comments:

- Nederlands, tenzij anders vermeld
- Rustig, zakelijk, direct
- Geen jargon, geen marketingtaal, geen "AI-powered", geen "revolutionary"
- Geen emoji's in UI of code-comments (in README's heel spaarzaam, max 1 per document)
- Em-dashes (—) alleen functioneel, niet als komma-vervanger
- Datums in Nederlands formaat (10 april 2026, niet 04/10/2026 of 2026-04-10 in UI)
- Bedragen in euro's met Nederlands formaat (€ 1.250,50)

## Visuele stijl

- Rustig, professioneel, geen speelgoed-look
- Referentie: Linear, Notion, Things — niet Bootstrap-default
- Veel witruimte, weinig kleur, duidelijke hiërarchie
- Moet er presentabel uitzien zodat appjes in een prospect-gesprek getoond kunnen worden

## Wat de appjes NIET zijn

Belangrijk om expliciet te benoemen, want hier sneuvelen veel van dit soort tools:

- Geen managementsystemen — het zijn logboeken en hulpmiddelen
- Geen workflow-engines met goedkeuringen en escalaties
- Geen integraties tenzij expliciet nodig (en dan zo dun mogelijk)
- Geen multi-user, geen accounts, geen login (tenzij een specifiek appje dat echt nodig heeft)
- Geen analytics, scoreboards, of "performance"-metingen van mensen
- Geen notificaties via mail of Teams (visuele markeringen in de app zijn genoeg)

Vuistregel: als je twijfelt of een feature erbij moet, is het antwoord nee.

## Demo-data

Alle appjes moeten gedemonstreerd kunnen worden zonder leeg te ogen. Verzin een fictief maakbedrijf en gebruik dat consistent door alle appjes heen. Voorstel: **Van Houten Metaal**, een fictief familiebedrijf in Eindhoven dat metaalbewerking doet voor de machinebouw, ~120 medewerkers. Gebruik fictieve productnamen (bijv. "Frame Type 7", "Bracket A12"), fictieve KPI's met realistische waardes, en fictieve namen voor mensen ("Peter de Vries", "Anja Hendriks").

Geen echte klantnamen, geen echte cijfers, geen herkenbare details uit Thijs' werkervaring.

## Repo-structuur

```
datawijs-met-thijs/
├── README.md            # publieke landingspagina
├── CLAUDE.md            # dit bestand
├── LICENSE              # MIT
├── .gitignore           # globale ignores
├── apps/                # alle appjes leven hier, één map per appje
│   └── <naam>/
│       ├── CLAUDE.md    # app-specifieke context
│       ├── README.md    # publieke beschrijving van het appje
│       └── (code)
├── shared/              # alleen aanmaken als iets écht 2x nodig is
└── docs/                # overkoepelende documenten en leerlogboek
    └── leerlogboek.md
```

## Stack-keuzes

Stack is per appje vrij. Kaders die voor alle appjes gelden:

- Solo te bouwen en onderhouden door één persoon
- Eenvoud > volledigheid
- Lokaal draaien moet werken; deploybaar voor demo's (Vercel, Netlify, of simpele VPS)
- Geen build-pipelines die uit de hand lopen
- Geen CI/CD vanaf dag één — pas toevoegen als er tests zijn die er iets aan hebben

Bij twijfel over de stack: stel een voorstel met motivatie voor (max 1 A4) en wacht op akkoord voordat je begint te bouwen.

## Werkwijze met Claude Code

1. Lees deze root-CLAUDE.md én de app-specifieke CLAUDE.md
2. Bij een nieuwe app: stel eerst een stack-voorstel op met korte motivatie
3. Wacht op akkoord voordat je begint te bouwen
4. Bouw iteratief, in kleine stappen, met werkende tussenversies
5. Vraag door als iets onduidelijk is, raad niet
6. Schrijf commit messages in het Nederlands, beschrijvend maar beknopt
7. Update de app-README en het leerlogboek (`docs/leerlogboek.md`) als er iets noemenswaardigs gebeurt
8. Als je een Dockerfile schrijft: voeg `RUN mkdir -p /app/public` toe in de builder-stage vóór de build. Lege mappen worden niet door Git getrackt en bestaan dan niet in de Docker build-context, wat een cryptische COPY-fout geeft. Voeg ook de nieuwe app toe aan de root `docker-compose.yml`.
9. Verifieer Docker-builds lokaal met `docker compose build` voordat je commit.
