# Hypothese-tracker

> Lees eerst de root [CLAUDE.md](../../CLAUDE.md) voor de gedeelde context (doelgroep, stijl, principes, werkwijze). Dit document bevat alleen wat specifiek is voor deze app.

## Wat dit appje is

Een tool die tijdens een KPI-meeting een besluit vastlegt — inclusief de hypothese erachter en een nulmeting via screenshot — en op een afgesproken reviewmoment helpt te kijken of het besluit het verwachte effect had.

Het is de eerste burger van het *Decision OS*-concept en de meest uitgewerkte test van de centrale gedachte: *we vangen wat anders verdampt*.

## Waarom dit appje bestaat

Dashboards tonen *de stand*. Maar besluitvorming bestaat uit veel meer: wie heeft het gezien, wat dachten ze ervan, wat is besloten, met welke verwachting, en wat kwam eruit. Twee weken later weet niemand meer precies waarom iets besloten is, laat staan of de aanname klopte.

De Hypothese-tracker vangt drie dingen op het moment van besluiten — actie, hypothese, nulmeting — en pingt later terug om te kijken of het klopte. Niet om mensen af te rekenen, maar om patronen zichtbaar te maken: waar zit ons MT er structureel naast, en wat zegt dat over hoe we de business begrijpen?

## Doelgroep en context

- **Gebruiker MVP:** single user, één persoon die tijdens of na een KPI-meeting een besluit logt namens het team
- **Setting:** een MT- of teammeeting waarin een Power BI dashboard centraal staat
- **Doel build:** demo voor prospects (zie root CLAUDE.md voor doelgroep-details)
- **Niet:** productie-pilot bij een klant, multi-user, integraties

## Kernconcept: het besluit als eenheid

De centrale eenheid is *een besluit*, niet een KPI. Eén besluit kan meerdere KPI's raken (bijv. "minder korting geven aan grootste klant" raakt marge, omzet én klanttevredenheid). Filteren op KPI moet kunnen, maar de structuur is besluit-gericht.

Een besluit heeft twee fases: **open** (gelogd, wacht op review) en **gesloten** (gereviewd). Daartussen zit stilte.

## Datamodel (functioneel)

### Besluit
- id
- titel (kort, bijv. "Normtijd Frame Type 7 verhogen")
- datum besluit (default: vandaag)
- kpi-labels (multi-select, vrije lijst die de gebruiker zelf opbouwt)
- actie (tekst, wat gaan we concreet doen)
- hypothese (tekst, vrije vorm met optionele Mad Libs-steiger als placeholder)
- reviewdatum (datum)
- nulmeting-screenshots (één of meer afbeeldingen)
- status (open / gereviewd)

### Review (één per besluit, bestaat alleen na reviewen)
- nieuwe screenshots (één of meer afbeeldingen)
- oordeel (ja / deels / nee)
- geleerd (korte tekst, max ~200 tekens)
- reviewdatum-werkelijk (wanneer daadwerkelijk gereviewd)

### KPI (eenvoudige lijst)
- naam
- (optioneel later: kleur, beschrijving)

KPI's worden door de gebruiker zelf aangemaakt zodra ze bij een besluit getypt worden. Geen aparte beheer-screen nodig voor de MVP.

## Schermen

### 1. Besluitenlijst (homepage)
- Bovenaan: knop "Nieuw besluit"
- Optioneel filter: dropdown met KPI-labels
- Lijst van besluiten, gesorteerd op relevantie:
  - **Bovenaan:** open besluiten waarvan de reviewdatum is bereikt of voorbij ("klaar voor review")
  - **Daaronder:** open besluiten met toekomstige reviewdatum, gesorteerd op nabijheid
  - **Onderaan:** gesloten besluiten, meest recent eerst
- Per regel: titel, datum, KPI-labels (als chips), status-icoontje, en bij open: "nog X dagen" of "te reviewen"
- Bij gesloten besluiten: klein icoontje voor oordeel (✓ klopte / ~ deels / ✗ niet)

### 2. Nieuw besluit (formulier)
- Velden zoals in datamodel
- Hypothese-veld heeft een placeholder met de Mad Libs-steiger:
  > *Ik verwacht dat [KPI] over [periode] zal [stijgen/dalen] van [X] naar [Y], omdat [redenering].*
- Screenshot-upload: drag & drop of plak vanuit klembord (Ctrl+V), meerdere bestanden mogelijk
- Reviewdatum: datepicker, suggesties voor "+2 weken", "+4 weken", "+6 weken", "+3 maanden"
- Opslaan-knop, daarna terug naar lijst

### 3. Besluit-detail (lezen)
- Toont alle velden van het besluit
- Als status = open: knop "Reviewen"
- Als status = gesloten: toont ook de review-velden, screenshots vóór en na naast elkaar

### 4. Reviewen (formulier)
- Bovenaan: originele actie + hypothese ter herinnering
- Links: nulmeting-screenshots
- Rechts: upload nieuwe screenshots
- Drie grote knoppen: "Klopte" / "Deels" / "Niet"
- Tekstveld "Wat heb je geleerd?" (max ~200 tekens)
- Opslaan-knop, daarna terug naar detail of lijst

## Wat dit appje expliciet NIET doet

Naast de gedeelde "wat appjes niet zijn"-lijst uit de root CLAUDE.md, specifiek voor deze app:

- Geen automatische analyse of vergelijking van de twee screenshots (het oog van de gebruiker doet het werk)
- Geen Power BI-koppeling (komt later, MVP gebruikt screenshots)
- Geen rapportage over "hoe goed besluit het MT" — wel een visueel patroon zichtbaar in de lijst, geen percentages

## Demo-data

Gebruik het fictieve bedrijf Van Houten Metaal (zie root CLAUDE.md). Zorg voor 4-5 voorbeeldbesluiten:

- 1-2 open besluiten met toekomstige reviewdatum
- 1 open besluit dat klaar staat voor review
- 1-2 gesloten besluiten, met verschillende oordelen (één "klopte", één "deels", evt. één "niet")

Voorbeelden van besluit-titels: "Normtijd Frame Type 7 verhogen", "Minimum ordergrootte verhogen naar 50 stuks", "Tweede planner inzetten op spoedorders", "Bracket A12 outsourcen aan toeleverancier".

## Stack-voorstel gevraagd

Stel voordat je begint te bouwen een stack voor met korte motivatie. Vragen:
- Web of desktop?
- Welk framework, en waarom?
- Hoe slaan we screenshots op?
- Hoe deployen we voor demo's (URL die Thijs kan delen)?

Wacht op akkoord voordat je begint.
