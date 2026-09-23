import type { Finish, Target } from "./questions.ts";

export type ProductCategory = "barbermaskin" | "skjeggtrimmer" | "hode" | "kropp" | "hovel";
export type ProductMethod = "electric" | "razor";

/** Fiktive demoprodukter. Navn, priser og egenskaper er ikke ekte produktdata. */
export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  type: string;
  targets: Target[];
  finishes: Finish[];
  methods: Array<ProductMethod | "unsure">;
  sensitive: boolean;
  budget: "low" | "mid" | "high";
  price: number;
  best: string;
  features: string[];
  reasons: { target: string; finish: string; sensitive: string };
}

export const products: readonly Product[] = [
  {
    id: "nordtrim-s5", code: "S5", name: "Nordtrim S5", category: "barbermaskin", type: "Elektrisk barbermaskin",
    targets: ["face", "beard"], finishes: ["smooth"], methods: ["electric", "unsure"], sensitive: true, budget: "mid", price: 1490,
    best: "Tett barbering av ansiktet, også når huden lett blir rød.", features: ["Fleksibelt foliehode", "Våt og tørr", "60 min batteri"],
    reasons: { target: "laget for tett barbering av ansikt og skjegg", finish: "gir et tett og glatt resultat", sensitive: "foliehodet er et skånsomt valg ved sensitiv hud" },
  },
  {
    id: "fjordcut-r7", code: "R7", name: "FjordCut R7", category: "barbermaskin", type: "Roterende barbermaskin",
    targets: ["face", "beard", "head"], finishes: ["smooth"], methods: ["electric", "unsure"], sensitive: false, budget: "high", price: 1890,
    best: "Kraftig skjeggvekst og konturer som krever fleksible hoder.", features: ["Tre roterende hoder", "Hurtiglading", "Reiseetui"],
    reasons: { target: "følger konturene i ansikt, skjegg og hode", finish: "tar kraftig vekst tett", sensitive: "passer best når huden tåler flere passeringer" },
  },
  {
    id: "tryggbarber-l1", code: "L1", name: "TryggBarber L1", category: "hovel", type: "Sikkerhetshøvel",
    targets: ["face", "beard", "head"], finishes: ["smooth"], methods: ["razor", "unsure"], sensitive: true, budget: "low", price: 590,
    best: "Manuell, tett barbering med kontroll og rimelige blader.", features: ["Lukket kam", "Metallgrep", "5 demoblader"],
    reasons: { target: "gir presis kontroll på ansikt, skjegg og hode", finish: "kan gi svært glatt resultat", sensitive: "lukket kam er mildere enn aggressive høvler" },
  },
  {
    id: "skarv-t9", code: "T9", name: "Skarv T9", category: "skjeggtrimmer", type: "Skjeggtrimmer",
    targets: ["beard", "face"], finishes: ["trim"], methods: ["electric", "unsure"], sensitive: true, budget: "mid", price: 990,
    best: "Jevn skjegglengde og presise kanter fra 0,5 til 18 mm.", features: ["20 lengder", "Presisjonshode", "90 min batteri"],
    reasons: { target: "er bygget for skjegg og detaljer", finish: "gir jevn trimming uten å barbere helt ned", sensitive: "avrundede tenner er skånsomme mot huden" },
  },
  {
    id: "polar-edge-mini", code: "PE", name: "Polar Edge Mini", category: "skjeggtrimmer", type: "Kompakt detaljtrimmer",
    targets: ["beard", "face", "body"], finishes: ["trim"], methods: ["electric", "unsure"], sensitive: false, budget: "low", price: 449,
    best: "Enkel vedlikeholdstrimming og skarpe linjer på liten plass.", features: ["Smalt skjær", "USB-lading", "Tre kammer"],
    reasons: { target: "er praktisk til små områder og konturer", finish: "holder hår kort uten helt glatt barbering", sensitive: "bør brukes rolig på ekstra følsomme områder" },
  },
  {
    id: "boreal-head-x", code: "HX", name: "Boreal Head X", category: "hode", type: "Hodebarbermaskin",
    targets: ["head"], finishes: ["smooth"], methods: ["electric", "unsure"], sensitive: true, budget: "high", price: 2190,
    best: "Rask og jevn hodebarbering med godt grep rundt bakhodet.", features: ["Fem fleksible hoder", "Håndflategrep", "Våt og tørr"],
    reasons: { target: "er formet for hele hodebunnen", finish: "gir et jevnt, glatt resultat", sensitive: "fordeler trykket over fem fleksible hoder" },
  },
  {
    id: "kyst-head-flex", code: "HF", name: "Kyst Head Flex", category: "hode", type: "Allround hode- og hårtrimmer",
    targets: ["head", "beard"], finishes: ["trim"], methods: ["electric", "unsure"], sensitive: false, budget: "mid", price: 1290,
    best: "Deg som veksler mellom kort hår, hodebarbering og skjegg.", features: ["8 kammer", "Bredt skjær", "75 min batteri"],
    reasons: { target: "dekker både hode og skjegg", finish: "gir fleksibel og jevn kort trimming", sensitive: "fungerer best med lett hånd" },
  },
  {
    id: "roam-body-b4", code: "B4", name: "Roam Body B4", category: "kropp", type: "Kroppstrimmer",
    targets: ["body"], finishes: ["trim", "smooth"], methods: ["electric", "unsure"], sensitive: true, budget: "mid", price: 890,
    best: "Trygg trimming av bryst, rygg og sensitive kroppsområder.", features: ["Hudbeskytter", "Dusjsikker", "Toveis skjær"],
    reasons: { target: "er utviklet for kroppens ulike områder", finish: "kan både trimme og barbere kort", sensitive: "hudbeskytteren reduserer direkte kontakt med skjæret" },
  },
  {
    id: "myk-hud-kit", code: "MH", name: "Myk Hud Kit", category: "hovel", type: "Barberhøvel med hudbeskyttelse",
    targets: ["face", "beard", "body"], finishes: ["smooth"], methods: ["razor", "unsure"], sensitive: true, budget: "low", price: 349,
    best: "Rimelig og kontrollert høvelbarbering for lettirritert hud.", features: ["Færre blader", "Bevegelig hode", "Grepsvennlig skaft"],
    reasons: { target: "fungerer til ansikt, skjegg og kropp", finish: "gir glatt resultat med få passeringer", sensitive: "færre blader kan bety mindre friksjon" },
  },
  {
    id: "allround-a6", code: "A6", name: "Allround A6", category: "kropp", type: "Multitrimmer",
    targets: ["face", "beard", "head", "body"], finishes: ["trim"], methods: ["electric", "unsure"], sensitive: true, budget: "mid", price: 1390,
    best: "Én maskin til skjegg, hår og kropp – først og fremst trimming.", features: ["12 tilbehør", "Selvslipende skjær", "100 min batteri"],
    reasons: { target: "dekker flere bruksområder", finish: "er sterkest på trimming og vedlikehold", sensitive: "har egne kammer for skånsom kroppstrimming" },
  },
];
