import { Request, Response } from "express";
import { createRouter } from "@/utils/create-router";
import { resolveAddress, ERC20Transfer } from "./service";

const router = createRouter();

router.post("/spend-loyalty", async (req: Request, res: Response) => {
  const { body: {
    privateKey, recipientAddress, tokenAddress, tokenAmount
  }} = req;
  await ERC20Transfer(tokenAddress, recipientAddress, tokenAmount, false, privateKey);

});


router.post("/setup-wallet", async (req: Request, res: Response) => {
  const { body: { privateKey } } = req;
  const publicAddress = await resolveAddress(privateKey);
  res.json({ publicKey: publicAddress }).send();
});

export default router;
