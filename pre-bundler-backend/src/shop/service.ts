import dotenv from "dotenv";

dotenv.config();

const KFET_ADDRESS = "kfet_address";
const FLAMS_ADDRESS = "flams_address";
const PLOUF_ADDRESS = "plouf_address";

export const shops = {
  [KFET_ADDRESS]: {
    address: KFET_ADDRESS,
    name: "Kfet",
    balance: "14.34572456",
    items: [
      { name: "Peinte de Triple", price: 3.5 },
      { name: "Peinte de Red", price: 4 },
      { name: "Peinte de Cidre", price: 4 },
    ],
  },
  [FLAMS_ADDRESS]: {
    address: FLAMS_ADDRESS,
    name: "Flams",
    balance: "134.986754",
    items: [
      { name: "Flam classique", price: 8 },
      { name: "Flam veggie", price: 10 },
      { name: "Flam ciboulette", price: 11 },
    ],
  },
  [PLOUF_ADDRESS]: {
    address: PLOUF_ADDRESS,
    name: "Plouf",
    balance: "4.8635",
    items: [
      { name: "Cuba Libre", price: 6 },
      { name: "Mojito", price: 7 },
      { name: "Moscow Mule", price: 8 },
    ],
  }
} as const;

export const shopBalances = {
  [KFET_ADDRESS]: {
    balance: "105.2",
    fidelity: [
      {},
    ],
  },
  [FLAMS_ADDRESS]: {
    balance: "25.30",
    fidelity: [
      {},
      {}
    ],
  },
  [PLOUF_ADDRESS]: {
    balance: "2.5",
    fidelity: [],
  }
} as const;
