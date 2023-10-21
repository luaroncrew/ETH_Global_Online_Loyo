import { Request, Response } from "express";
import { QRCodeRenderersOptions, toDataURL } from "qrcode";

import { createRouter } from "@/utils/create-router";
import { getBalancesOfAccounts } from "./service";

const router = createRouter();

router.get("/:address/balance", async (req: Request, res: Response) => {
  const { address } = req.params;
  const balances = await getBalancesOfAccounts(address);
  res.send({ balances });
});

router.get("/:address/qr", async (req: Request, res: Response) => {

  const { address } = req.params;

  const payload = JSON.stringify({
    address
  });

  const options: QRCodeRenderersOptions = {
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF"
    },
    errorCorrectionLevel: "H",
  };

  const qrCode = await toDataURL(payload, options);

  res.send({ qrCode });
});

export default router;
