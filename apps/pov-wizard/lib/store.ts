"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ImpactCategorie, Horizon } from "./constants";

export type PovDraft = {
  observatie: {
    kpi: string;
    huidigeWaarde: string;
    verwachteWaarde: string;
    periode: string;
    toelichting: string;
  };
  karakters: {
    held: string;
    tegenstander: string;
  };
  actie: {
    werkwoord: string;
    object: string;
    kwantificering: string;
  };
  inzet: {
    categorie: ImpactCategorie | "";
    impact: string;
    horizon: Horizon | "";
  };
  syntheseZin: string;
};

const leegeDraft: PovDraft = {
  observatie: {
    kpi: "",
    huidigeWaarde: "",
    verwachteWaarde: "",
    periode: "",
    toelichting: "",
  },
  karakters: {
    held: "",
    tegenstander: "",
  },
  actie: {
    werkwoord: "",
    object: "",
    kwantificering: "",
  },
  inzet: {
    categorie: "",
    impact: "",
    horizon: "",
  },
  syntheseZin: "",
};

const voorbeeldDraft: PovDraft = {
  observatie: {
    kpi: "OEE lijn 3",
    huidigeWaarde: "68%",
    verwachteWaarde: "82%",
    periode: "week 14",
    toelichting:
      "Al drie weken op rij onder target, vooral in de ochtendploeg.",
  },
  karakters: {
    held: "operator",
    tegenstander: "verouderd systeem",
  },
  actie: {
    werkwoord: "Verlaag",
    object: "de bandsnelheid op lijn 3",
    kwantificering: "met 10% tot einde van de week",
  },
  inzet: {
    categorie: "marge",
    impact: "€40.000 per maand",
    horizon: "binnen een maand",
  },
  syntheseZin: "",
};

type PovStore = {
  draft: PovDraft;
  setObservatie: (data: Partial<PovDraft["observatie"]>) => void;
  setKarakters: (data: Partial<PovDraft["karakters"]>) => void;
  setActie: (data: Partial<PovDraft["actie"]>) => void;
  setInzet: (data: Partial<PovDraft["inzet"]>) => void;
  setSynthese: (zin: string) => void;
  vulVoorbeeldIn: () => void;
  reset: () => void;
};

export const usePovStore = create<PovStore>()(
  persist(
    (set) => ({
      draft: leegeDraft,
      setObservatie: (data) =>
        set((state) => ({
          draft: {
            ...state.draft,
            observatie: { ...state.draft.observatie, ...data },
          },
        })),
      setKarakters: (data) =>
        set((state) => ({
          draft: {
            ...state.draft,
            karakters: { ...state.draft.karakters, ...data },
          },
        })),
      setActie: (data) =>
        set((state) => ({
          draft: {
            ...state.draft,
            actie: { ...state.draft.actie, ...data },
          },
        })),
      setInzet: (data) =>
        set((state) => ({
          draft: {
            ...state.draft,
            inzet: { ...state.draft.inzet, ...data },
          },
        })),
      setSynthese: (zin) =>
        set((state) => ({
          draft: { ...state.draft, syntheseZin: zin },
        })),
      vulVoorbeeldIn: () =>
        set({ draft: { ...voorbeeldDraft, syntheseZin: "" } }),
      reset: () => set({ draft: leegeDraft }),
    }),
    {
      name: "pov-wizard-draft",
    }
  )
);
