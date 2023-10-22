import { Request, Response } from "express";

import { createRouter } from "@/utils/create-router";
import { getBalanceForShop, shops } from "./service";

const router = createRouter();

router.get("/", async (req: Request, res: Response) => {

  res.send(Object.values(shops));
});

router.get("/:shopAddress", async (req: Request, res: Response) => {
  const { shopAddress } = req.params;

  res.send(shops[shopAddress as keyof typeof shops]);
});

router.get("/:shopAddress/balance/:publicKey", async (req: Request, res: Response) => {

  const { shopAddress, publicKey } = req.params;

  const balance = await getBalanceForShop(publicKey, shopAddress);

  res.send(balance);
});

export default router;
