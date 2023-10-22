import { Request, Response } from "express";

import { createRouter } from "@/utils/create-router";
import { shop, shops } from "./service";


const router = createRouter();

router.get("/", async (req: Request, res: Response) => {
  
  res.send(shops);
});

router.get("/:address", async (req: Request, res: Response) => {

  res.send(shop);
});

export default router;
