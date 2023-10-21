import {ethers} from "ethers";
import {Presets, Client} from "userop";
import dotenv from "dotenv";
import {loyoABI} from "@/pre-bundler/user-operation/LOYO_BUSINESS_TOKEN_ABI";


const LOYO_BUSINESS_TOKEN_DECIMALS = 18;

/**
 * returns the deterministic public key of the SC Wallet that will be deployed with the first userOperation
 * @param privateKey
 */
export async function resolveAddress(privateKey: string) {
    const bundlerUrl = getBundlerUrl();
    try {
        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            new ethers.Wallet(privateKey),
            bundlerUrl
        );
        const address = simpleAccount.getSender();
        console.log(`SimpleAccount address: ${address}`);
        return address;
    }
    catch (e) {
        throw e;
    }
}


export async function ERC20Transfer(
    tokenAddress: string,
    recipientAddress: string,
    tokenAmount: string,
    withPaymaster: boolean,
    privateKey: string  // maranzana's nightmare FIXME: create operation in frontend and send a signed operation
                        // without any private key
) {
    // parameters that will be used for the paymaster
    const paymasterMiddleware = undefined;
    const overrideBundleRpc: string = "";

    const bundlerUrl = getBundlerUrl();
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(privateKey),
        bundlerUrl,
        { paymasterMiddleware, overrideBundlerRpc: overrideBundleRpc }
    );

    const client = await Client.init(bundlerUrl, {
        overrideBundlerRpc: overrideBundleRpc
    });
    const provider = new ethers.providers.JsonRpcProvider(bundlerUrl);
    const token = ethers.utils.getAddress(tokenAddress);
    const to = ethers.utils.getAddress(recipientAddress);
    const erc20 = new ethers.Contract(token, loyoABI, provider);

    const amount = ethers.utils.parseUnits(tokenAmount, LOYO_BUSINESS_TOKEN_DECIMALS);
    const [symbol] = await Promise.all([
        erc20.symbol(),
    ]);

    console.log(`Transferring ${amount} of ${symbol}`);

    const res = await client.sendUserOperation(
        simpleAccount.execute(
            erc20.address,
            0,
            erc20.interface.encodeFunctionData("transfer", [to, amount])
        ),
        {
            dryRun: false,
            onBuild: (op) => console.log("Signed UserOperation:", op),
        }
    );


    // for transfering MATIC (works perfectly)
    // const res = await client.sendUserOperation(
    //     simpleAccount.execute(to, amount, "0x"),
    //     {
    //         dryRun: false,
    //         onBuild: (op) => console.log("Signed UserOperation:", op),
    //     }
    // );


    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}


function getBundlerUrl(): string {
    dotenv.config();
    let bundlerUrl: string = "";
    if (process.env.BUNDLER_RPC_URL) {
        bundlerUrl = process.env.BUNDLER_RPC_URL;
    }
    return bundlerUrl
}

