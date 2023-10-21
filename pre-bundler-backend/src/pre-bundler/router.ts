import userOperationRouter from "./user-operation";

import { createRouter } from "@/utils/create-router";

const router = createRouter();

router.use("/user-operation", userOperationRouter);

export default router;
