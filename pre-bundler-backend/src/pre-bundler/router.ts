import userOperationRouter from "./user-operation";

import { createRouter } from "@/utils/create-router";
import { NextFunction, Request, Response } from "express";

const router = createRouter();

router.use("/user-operation", userOperationRouter);

export default router;
