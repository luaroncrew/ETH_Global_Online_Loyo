import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { resolveAddress } from "./userOperationService"

dotenv.config();

const app: Express = express();
app.use(express.json()); // allow json bodies

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('pong');
});

app.get('/spend-loyalty', (req: Request, res: Response) => {
  // parse operation from json
  // call userOp service
  // return confirmation/error
});

app.post('/setup-wallet', async (req: Request, res: Response) => {
  let prKey = "test";
  if (req.body) {
    prKey = req.body["privateKey"];
  }
  const publicAddress = await resolveAddress(prKey);
  await res.json({publicKey: publicAddress}).send();
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});



