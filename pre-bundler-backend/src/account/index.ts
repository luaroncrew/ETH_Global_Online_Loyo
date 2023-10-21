import { Request, Response } from "express";
import { createRouter } from "@/utils/create-router";

const router = createRouter();

router.get("/balance", (req: Request, res: Response) => {
  const { body: address } = req;
  res.send({ address });
});

export default router;
