import { Request, Response } from "express";
import { createRouter } from "@/utils/create-router";
import { resolveAddress, ERC20Transfer } from "./service";

const router = createRouter();

router.post("/spend-loyalty", async (req: Request, res: Response) => {
  let { body: {
    privateKey, recipientAddress, tokenAddress, tokenAmount, withPaymaster
  } } = req;
  withPaymaster = Boolean(withPaymaster);
  await ERC20Transfer(tokenAddress, recipientAddress, tokenAmount, withPaymaster, privateKey);
  res.sendStatus(200);

});


router.post("/setup-wallet", async (req: Request, res: Response) => {
  const { body: { privateKey } } = req;
  const publicAddress = await resolveAddress(privateKey);
  res.json({ publicKey: publicAddress });
});


export default router;
