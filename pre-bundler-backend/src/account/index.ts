import { Request, Response } from "express";
import { createRouter } from "@/utils/create-router";
import { getBalancesOfAccounts } from "./service";

const router = createRouter();

router.get("/:address/balance", async (req: Request, res: Response) => {
  const { address } = req.params;
  const balances = await getBalancesOfAccounts(address);
  res.send({ balances });
});

export default router;
