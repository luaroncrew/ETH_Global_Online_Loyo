import preBundlerRouter from "@/pre-bundler/router";

import { createRouter } from "./utils/create-router";
import { NextFunction, Request, Response } from "express";

const router = createRouter();

router.use("/pre-bundler", preBundlerRouter);

// router.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({
//     status: "internal-server-error",
//     message: "Internal server error",
//   });
// });

export default router;
