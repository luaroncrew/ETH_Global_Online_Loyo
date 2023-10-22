import dotenv from "dotenv";

dotenv.config();

export const shop = {
  name: "Kfet",
  balance: "14.34572456",
  hasFidelityCard: false,
  items: [
    { name: "Peinte de Triple", price: 3.5 },
    { name: "Peinte de Red", price: 4 },
    { name: "Peinte de Cidre", price: 4 },
  ],
} as const;

export const shops = [
  shop,
  {
    name: "Flams",
    balance: "134.986754",
    hasFidelityCard: true,
    items: [
      { name: "Flam classique", price: 8 },
      { name: "Flam veggie", price: 10 },
      { name: "Flam ciboulette", price: 11 },
    ],
  },
  {
    name: "Plouf",
    balance: "4.8635",
    hasFidelityCard: false,
    items: [
      { name: "Cuba Libre", price: 6 },
      { name: "Mojito", price: 7 },
      { name: "Moscow Mule", price: 8 },
    ],
  }
] as const;
