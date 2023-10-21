import { Request, Response } from "express";
import { createRouter } from "@/utils/create-router";
import { resolveAddress } from "./service";

const router = createRouter();

router.get("/spend-loyalty", (req: Request, res: Response) => {
  // parse operation from json
  // call userOp service
  // return confirmation/error
});


router.post("/setup-wallet", async (req: Request, res: Response) => {

  const { body: { privateKey } } = req;

  const publicAddress = await resolveAddress(privateKey);

  res.json({ publicKey: publicAddress }).send();
});

export default router;
