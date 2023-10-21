import { Request, Response } from "express";
import { QRCodeRenderersOptions, toDataURL } from "qrcode";

import { createRouter } from "@/utils/create-router";

const router = createRouter();

router.get("/balance", (req: Request, res: Response) => {
  const { body: address } = req;
  res.send({ address });
});

router.post("/qr", async (req: Request, res: Response) => {

  const { body: {
    address
  } } = req;

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

  res.json({ qrCode }).send();
});

export default router;
