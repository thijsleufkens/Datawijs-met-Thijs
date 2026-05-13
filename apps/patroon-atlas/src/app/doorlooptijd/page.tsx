import { Binnenkort } from "@/components/Binnenkort";

export default function DoorlooptijdPage() {
  return (
    <Binnenkort
      nummer="02"
      titel="Doorlooptijd"
      vraag="Welke projecten lopen structureel uit?"
      beschrijving="Geplande versus werkelijke doorlooptijd, met een diagonaal voor 'op tijd'. Wat in een gemiddeld-doorlooptijd-KPI als één getal verschijnt, valt hier uiteen in twee groepen: projecten die voorspelbaar zijn, en projecten die dat structureel niet zijn."
      voorbeeld="Een verpakkingslijn voor Vink Diepvries die 8 weken uitliep, naast een kleinere trayloader-opdracht voor Westland die exact op planning lag — twee getallen die in een maandrapport allebei meetellen in hetzelfde gemiddelde."
    />
  );
}
