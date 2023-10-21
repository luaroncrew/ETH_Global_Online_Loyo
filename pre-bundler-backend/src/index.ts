import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { resolveAddress } from "./pre-bundler/user-operation/service";
import router from "./router";

dotenv.config();

const app: Express = express();
app.use(express.json()); // allow json bodies

const port = process.env.PORT;

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
