import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

type Balance = {
  name: string;
  balance: string;
};

const BUSINESSES = {
  KFET: { address: "0x0D138a23541905e963a32eBD227C96ec741408a0", name: "Kfet" },
};

const ABI = ["function balanceOf(address account) view returns (uint256)"];

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);

export const getBalancesOfAccounts = (address: string) => {
  return Promise.all(
    Object.values(BUSINESSES).map(async (business) => {
      const contract = new ethers.Contract(business.address, ABI, provider);

      const { _hex } = await contract.balanceOf(address);

      return {
        name: business.name,
        balance: ethers.utils.formatEther(BigInt(_hex)),
      };
    })
  );
};
