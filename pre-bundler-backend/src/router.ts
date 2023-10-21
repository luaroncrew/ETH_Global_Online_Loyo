import preBundlerRouter from "@/pre-bundler/router";
import accountRouter from "@/account";

import { createRouter } from "./utils/create-router";
import { NextFunction, Request, Response } from "express";

const router = createRouter();

router.use("/pre-bundler", preBundlerRouter);
router.use("/account", accountRouter);

router.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: "internal-server-error",
    message: JSON.stringify(err),
  });
});

export default router;
