import { Binnenkort } from "@/components/Binnenkort";

export default function FasesPage() {
  return (
    <Binnenkort
      nummer="03"
      titel="Projectfases"
      vraag="Waar lekken de uren binnen een project?"
      beschrijving="Per fase — engineering, assemblage, inbedrijfstelling — de geschatte uren tegen de werkelijke. Per fase een eigen kleur. Soms wijst één fase consistent omhoog: dat is geen pech maar een structurele onderschatting in de calculatie."
      voorbeeld="De engineering-fase van de Sleevemachine S22-projecten wijkt over twee jaar gemiddeld 60-80% af van de schatting, terwijl assemblage steeds netjes blijft binnen 5%. Dat patroon zie je niet als je alleen op totaal-uren stuurt."
    />
  );
}
