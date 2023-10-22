import { Request, Response } from "express";

import { createRouter } from "@/utils/create-router";
import { shopBalances, shops } from "./service";

const router = createRouter();

router.get("/", async (req: Request, res: Response) => {

  res.send(Object.values(shops));
});

router.get("/:address", async (req: Request, res: Response) => {
  const { address } = req.params;

  res.send(shops[address as keyof typeof shopBalances]);
});

router.get("/:address/balance", async (req: Request, res: Response) => {

  const { address } = req.params;

  res.send(shopBalances[address as keyof typeof shopBalances]);
});

export default router;
