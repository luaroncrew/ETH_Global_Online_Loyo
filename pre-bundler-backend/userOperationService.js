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
exports.resolveAddress = void 0;
const ethers_1 = require("ethers");
const userop_1 = __importDefault(require("userop"));
const dotenv_1 = __importDefault(require("dotenv"));
// dev test constants
const KFET_LOYO_TOKEN_ADDRESS = "0x0D138a23541905e963a32eBD227C96ec741408a0";
// class ERC20TransferOperationData {
//     constructor(transferAmount: number, shopAddress: string, signature: string) {
//     }
// }
function resolveAddress(privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        // load env variables
        dotenv_1.default.config();
        let _privateKey;
        if (privateKey == "test") {
            _privateKey = String(process.env.TEST_LOYO_USER_EAO_PRIVATE_KEY);
        }
        else {
            _privateKey = privateKey;
        }
        let bundlerUrl = "";
        if (process.env.BUNDLER_RPC_URL) {
            bundlerUrl = process.env.BUNDLER_RPC_URL;
        }
        const simpleAccount = yield userop_1.default.Presets.Builder.SimpleAccount.init(new ethers_1.ethers.Wallet(_privateKey), bundlerUrl);
        const address = simpleAccount.getSender();
        console.log(`SimpleAccount address: ${address}`);
        return address;
    });
}
exports.resolveAddress = resolveAddress;
function handleUserOperation() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
// async function sendUserOp(signer: Wallet, contract: Contract) {
//
//     dotenv.config();
//     const rpcUrl = process.env.RPC_URL || "";
//     // Initialize userop builder
//     var builder = await userop.Presets.Builder.Kernel.init(signer, rpcUrl);
//     const address = builder.getSender();
//     console.log(`Account address: ${address}`);
//
//     const call = {
//         to: "0x...",
//         value: toBigInt(0),
//         data: contract.interface.encodeFunctionData(...);
//     };
//
//     // Build & send
//     const client = await userop.Client.init(rpcUrl);
//     const res = await client.sendUserOperation(builder.execute(call), {
//         onBuild: (op) => console.log("Signed UserOperation:", op),
//     });
//
//     console.log(`UserOpHash: ${res.userOpHash}`);
//     console.log("Waiting for transaction...");
//     const ev = await res.wait();
//     console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
// }
//
// import { ethers } from "ethers";
// import { ERC20_ABI } from "../../src";
// // @ts-ignore
// import config from "../../config.json";
// import { Client, Presets } from "userop";
// import { CLIOpts } from "../../src";
//
//
// async function ERC20Transfer(
//     tkn: string,
//     t: string,
//     amt: string,
//     opts: CLIOpts
// ) {
//     const paymasterMiddleware = opts.withPM
//         ? Presets.Middleware.verifyingPaymaster(
//             config.paymaster.rpcUrl,
//             config.paymaster.context
//         )
//         : undefined;
//     const simpleAccount = await Presets.Builder.SimpleAccount.init(
//         new ethers.Wallet(config.signingKey),
//         config.rpcUrl,
//         { paymasterMiddleware, overrideBundlerRpc: opts.overrideBundlerRpc }
//     );
//     const client = await Client.init(config.rpcUrl, {
//         overrideBundlerRpc: opts.overrideBundlerRpc,
//     });
//
//     const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
//     const token = ethers.utils.getAddress(tkn);
//     const to = ethers.utils.getAddress(t);
//     const erc20 = new ethers.Contract(token, ERC20_ABI, provider);
//     const [symbol, decimals] = await Promise.all([
//         erc20.symbol(),
//         erc20.decimals(),
//     ]);
//     const amount = ethers.utils.parseUnits(amt, decimals);
//     console.log(`Transferring ${amt} ${symbol}...`);
//
//     const res = await client.sendUserOperation(
//         simpleAccount.execute(
//             erc20.address,
//             0,
//             erc20.interface.encodeFunctionData("transfer", [to, amount])
//         ),
//         {
//             dryRun: opts.dryRun,
//             onBuild: (op) => console.log("Signed UserOperation:", op),
//         }
//     );
//     console.log(`UserOpHash: ${res.userOpHash}`);
//
//     console.log("Waiting for transaction...");
//     const ev = await res.wait();
//     console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
// }
