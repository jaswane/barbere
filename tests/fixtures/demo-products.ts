/*
 * De ti fiktive demoproduktene fra prototypen, konvertert til den nye modellen.
 * Brukes bare i overgangstesten. Ja/nei-sensitivitet er oversatt slik: ja = recommended, nei = neutral.
 */
import type { Product } from "../../data/types.ts";

export const demoProducts: readonly Product[] = [
  {
    "id": "nordtrim-s5",
    "brand": "Demo",
    "model": "Nordtrim S5",
    "category": "barbermaskin",
    "productType": "Elektrisk barbermaskin",
    "targets": [
      "face",
      "beard"
    ],
    "finishes": [
      "smooth"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 1490,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Tett barbering av ansiktet, også når huden lett blir rød.",
    "features": [
      "Fleksibelt foliehode",
      "Våt og tørr",
      "60 min batteri"
    ],
    "reasons": {
      "target": "laget for tett barbering av ansikt og skjegg",
      "finish": "gir et tett og glatt resultat",
      "sensitive": "foliehodet er et skånsomt valg ved sensitiv hud"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "fjordcut-r7",
    "brand": "Demo",
    "model": "FjordCut R7",
    "category": "barbermaskin",
    "productType": "Roterende barbermaskin",
    "targets": [
      "face",
      "beard",
      "head"
    ],
    "finishes": [
      "smooth"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "neutral"
    },
    "referencePrice": {
      "amount": 1890,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Kraftig skjeggvekst og konturer som krever fleksible hoder.",
    "features": [
      "Tre roterende hoder",
      "Hurtiglading",
      "Reiseetui"
    ],
    "reasons": {
      "target": "følger konturene i ansikt, skjegg og hode",
      "finish": "tar kraftig vekst tett",
      "sensitive": "passer best når huden tåler flere passeringer"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "tryggbarber-l1",
    "brand": "Demo",
    "model": "TryggBarber L1",
    "category": "hovel",
    "productType": "Sikkerhetshøvel",
    "targets": [
      "face",
      "beard",
      "head"
    ],
    "finishes": [
      "smooth"
    ],
    "method": "razor",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 590,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Manuell, tett barbering med kontroll og rimelige blader.",
    "features": [
      "Lukket kam",
      "Metallgrep",
      "5 demoblader"
    ],
    "reasons": {
      "target": "gir presis kontroll på ansikt, skjegg og hode",
      "finish": "kan gi svært glatt resultat",
      "sensitive": "lukket kam er mildere enn aggressive høvler"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "skarv-t9",
    "brand": "Demo",
    "model": "Skarv T9",
    "category": "skjeggtrimmer",
    "productType": "Skjeggtrimmer",
    "targets": [
      "beard",
      "face"
    ],
    "finishes": [
      "trim"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 990,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Jevn skjegglengde og presise kanter fra 0,5 til 18 mm.",
    "features": [
      "20 lengder",
      "Presisjonshode",
      "90 min batteri"
    ],
    "reasons": {
      "target": "er bygget for skjegg og detaljer",
      "finish": "gir jevn trimming uten å barbere helt ned",
      "sensitive": "avrundede tenner er skånsomme mot huden"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "polar-edge-mini",
    "brand": "Demo",
    "model": "Polar Edge Mini",
    "category": "skjeggtrimmer",
    "productType": "Kompakt detaljtrimmer",
    "targets": [
      "beard",
      "face",
      "body"
    ],
    "finishes": [
      "trim"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "neutral"
    },
    "referencePrice": {
      "amount": 449,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Enkel vedlikeholdstrimming og skarpe linjer på liten plass.",
    "features": [
      "Smalt skjær",
      "USB-lading",
      "Tre kammer"
    ],
    "reasons": {
      "target": "er praktisk til små områder og konturer",
      "finish": "holder hår kort uten helt glatt barbering",
      "sensitive": "bør brukes rolig på ekstra følsomme områder"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "boreal-head-x",
    "brand": "Demo",
    "model": "Boreal Head X",
    "category": "hode",
    "productType": "Hodebarbermaskin",
    "targets": [
      "head"
    ],
    "finishes": [
      "smooth"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 2190,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Rask og jevn hodebarbering med godt grep rundt bakhodet.",
    "features": [
      "Fem fleksible hoder",
      "Håndflategrep",
      "Våt og tørr"
    ],
    "reasons": {
      "target": "er formet for hele hodebunnen",
      "finish": "gir et jevnt, glatt resultat",
      "sensitive": "fordeler trykket over fem fleksible hoder"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "kyst-head-flex",
    "brand": "Demo",
    "model": "Kyst Head Flex",
    "category": "hode",
    "productType": "Allround hode- og hårtrimmer",
    "targets": [
      "head",
      "beard"
    ],
    "finishes": [
      "trim"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "neutral"
    },
    "referencePrice": {
      "amount": 1290,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Deg som veksler mellom kort hår, hodebarbering og skjegg.",
    "features": [
      "8 kammer",
      "Bredt skjær",
      "75 min batteri"
    ],
    "reasons": {
      "target": "dekker både hode og skjegg",
      "finish": "gir fleksibel og jevn kort trimming",
      "sensitive": "fungerer best med lett hånd"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "roam-body-b4",
    "brand": "Demo",
    "model": "Roam Body B4",
    "category": "kropp",
    "productType": "Kroppstrimmer",
    "targets": [
      "body"
    ],
    "finishes": [
      "trim",
      "smooth"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 890,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Trygg trimming av bryst, rygg og sensitive kroppsområder.",
    "features": [
      "Hudbeskytter",
      "Dusjsikker",
      "Toveis skjær"
    ],
    "reasons": {
      "target": "er utviklet for kroppens ulike områder",
      "finish": "kan både trimme og barbere kort",
      "sensitive": "hudbeskytteren reduserer direkte kontakt med skjæret"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "myk-hud-kit",
    "brand": "Demo",
    "model": "Myk Hud Kit",
    "category": "hovel",
    "productType": "Barberhøvel med hudbeskyttelse",
    "targets": [
      "face",
      "beard",
      "body"
    ],
    "finishes": [
      "smooth"
    ],
    "method": "razor",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 349,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Rimelig og kontrollert høvelbarbering for lettirritert hud.",
    "features": [
      "Færre blader",
      "Bevegelig hode",
      "Grepsvennlig skaft"
    ],
    "reasons": {
      "target": "fungerer til ansikt, skjegg og kropp",
      "finish": "gir glatt resultat med få passeringer",
      "sensitive": "færre blader kan bety mindre friksjon"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  },
  {
    "id": "allround-a6",
    "brand": "Demo",
    "model": "Allround A6",
    "category": "kropp",
    "productType": "Multitrimmer",
    "targets": [
      "face",
      "beard",
      "head",
      "body"
    ],
    "finishes": [
      "trim"
    ],
    "method": "electric",
    "sensitivity": {
      "level": "recommended",
      "sourceId": "demo"
    },
    "referencePrice": {
      "amount": 1390,
      "checkedAt": "2026-09-23",
      "sourceId": "demo"
    },
    "bestFor": "Én maskin til skjegg, hår og kropp – først og fremst trimming.",
    "features": [
      "12 tilbehør",
      "Selvslipende skjær",
      "100 min batteri"
    ],
    "reasons": {
      "target": "dekker flere bruksområder",
      "finish": "er sterkest på trimming og vedlikehold",
      "sensitive": "har egne kammer for skånsom kroppstrimming"
    },
    "specSourceIds": [
      "demo"
    ],
    "sources": [
      {
        "id": "demo",
        "label": "Fiktivt demoprodukt fra prototypen",
        "url": "https://barbere-no.andreas-swane.chatgpt.site",
        "retrievedAt": "2026-09-23"
      }
    ],
    "status": "active"
  }
];
