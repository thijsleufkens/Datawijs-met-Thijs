import { Binnenkort } from "@/components/Binnenkort";

export default function MigratiePage() {
  return (
    <Binnenkort
      nummer="04"
      titel="Migratie"
      vraag="Welke klanten zijn anders dan vorig jaar?"
      beschrijving="Dezelfde klanten in 2024 en 2025, in dezelfde scatterplot. Een pijltje per klant tussen beide jaren. Klanten die de pijl horizontaal of verticaal doortrekken zijn stabiel; de schuine pijlen vertellen het verhaal dat normaal verstopt zit achter een jaarcijfer."
      voorbeeld="De Vegter Vleeswaren zakt van een gezonde 11% marge naar 4% bij ongeveer dezelfde omzet — de pijl wijst recht naar beneden. Hoogland Zuivel verdrievoudigt juist de omzet, met behoud van marge. Twee verhalen, één plot."
    />
  );
}
