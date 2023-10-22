import { Request, Response } from "express";
import { QRCodeRenderersOptions, toDataURL } from "qrcode";

import { createRouter } from "@/utils/create-router";
import { getBalanceForShops } from "@/shop/service";

const router = createRouter();

router.get("/:address/balance", async (req: Request, res: Response) => {
  const { address } = req.params;

  const balance = await getBalanceForShops(address);

  res.send(balance);
});

router.get("/:address/qr", async (req: Request, res: Response) => {
  const { address } = req.params;

  const payload = JSON.stringify({
    address,
  });

  const options: QRCodeRenderersOptions = {
    color: {
      dark: "#000000",
      light: "#0000",
    },
    errorCorrectionLevel: "H",
  };

  const qrCode = await toDataURL(payload, options);

  res.send({ qrCode });
});

export default router;
