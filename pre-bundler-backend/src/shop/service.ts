import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const KFET_ADDRESS = process.env.KFET_LOYO_TOKEN_ADDRESS ?? "kfet_address";
const FLAMS_ADDRESS = "flams_address";
const PLOUF_ADDRESS = "plouf_address";

export const shops = {
  [KFET_ADDRESS]: {
    address: KFET_ADDRESS,
    name: "Kfet",
    items: [
      { name: "Peinte de Triple", price: 3.5 },
      { name: "Peinte de Red", price: 4 },
      { name: "Peinte de Cidre", price: 4 },
    ],
  },
  [FLAMS_ADDRESS]: {
    address: FLAMS_ADDRESS,
    name: "Flams",
    items: [
      { name: "Flam classique", price: 8 },
      { name: "Flam veggie", price: 10 },
      { name: "Flam ciboulette", price: 11 },
    ],
  },
  [PLOUF_ADDRESS]: {
    address: PLOUF_ADDRESS,
    name: "Plouf",
    items: [
      { name: "Cuba Libre", price: 6 },
      { name: "Mojito", price: 7 },
      { name: "Moscow Mule", price: 8 },
    ],
  }
} as const;

const ABI = ["function balanceOf(address account) view returns (uint256)"];

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);

export const getBalanceForShop = async (publicKey: string, shopAddress: string) => {

  try {

    const contract = new ethers.Contract(shopAddress, ABI, provider);

    const { _hex } = await contract.balanceOf(publicKey);

    console.debug("getBalanceForShop", `succeed for shop ${shopAddress}`);

    return {
      balance: ethers.utils.formatEther(BigInt(_hex)),
      fidelity: []
    };
  }
  catch (e) {

    console.debug("getBalanceForShop", `failed for shop ${shopAddress}`);

    return {
      balance: "0.0",
      fidelity: []
    };
  }
};

export const getBalanceForShops = async (publicKey: string) => {
  return Promise.all(Object.values(shops).map((shop) => {

    return getBalanceForShop(publicKey, shop.address);
  }));
};