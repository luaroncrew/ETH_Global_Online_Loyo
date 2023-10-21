import {ethers} from "ethers";
import userop from "userop";
import dotenv from "dotenv";


// dev test constants
const KFET_LOYO_TOKEN_ADDRESS  = "0x0D138a23541905e963a32eBD227C96ec741408a0"

// class ERC20TransferOperationData {
//     constructor(transferAmount: number, shopAddress: string, signature: string) {
//     }
// }


export async function resolveAddress(privateKey: string) {

    // load env variables
    dotenv.config();

    let _privateKey: string;
    if (privateKey == "test") {
        _privateKey = String(process.env.TEST_LOYO_USER_EAO_PRIVATE_KEY);
    }
    else {
        _privateKey = privateKey
    }

    let bundlerUrl: string = "";
    if (process.env.BUNDLER_RPC_URL) {
        bundlerUrl = process.env.BUNDLER_RPC_URL;
    }

    const simpleAccount = await userop.Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(_privateKey),
        bundlerUrl
    );
    const address = simpleAccount.getSender();
    console.log(`SimpleAccount address: ${address}`);
    return address;
}

async function handleUserOperation() {

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


