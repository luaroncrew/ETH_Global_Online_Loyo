"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userOperationService_1 = require("./userOperationService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // allow json bodies
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('pong');
});
app.get('/spend-loyalty', (req, res) => {
    // parse operation from json
    // call userOp service
    // return confirmation/error
});
app.post('/setup-wallet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let prKey = "test";
    console.log("request: ", req);
    if (req.body) {
        prKey = req.body["privateKey"];
    }
    const publicAddress = yield (0, userOperationService_1.resolveAddress)(prKey);
    yield res.json({ publicKey: publicAddress }).send();
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
