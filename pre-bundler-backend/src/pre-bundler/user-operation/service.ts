import { ethers } from "ethers";
import { Presets, Client } from "userop";
import dotenv from "dotenv";
import { loyoABI } from "@/pre-bundler/user-operation/LOYO_BUSINESS_TOKEN_ABI";
import * as process from "process";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";


const LOYO_BUSINESS_TOKEN_DECIMALS = 18;
const PAYMASTER_DEFAULT_CONTEXT = "payg";

interface PaymasterContext {
    type: string;
}

export interface PaymasterParameters {
    paymasterUrl: string;
    paymasterContext: PaymasterContext;
}


/**
 * returns the deterministic public key of the SC Wallet that will be deployed with the first userOperation
 * @param privateKey
 */
export async function resolveAddress(privateKey: string) {

    const bundlerUrl = getBundlerUrl();

    const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(privateKey),
        bundlerUrl
    );
    
    const address = simpleAccount.getSender();

    console.log(`SimpleAccount address: ${address}`);

    return address;
}


export async function ERC20Transfer(
    tokenAddress: string,
    recipientAddress: string,
    tokenAmount: string,
    withPaymaster: boolean,
    privateKey: string  //  nightmare FIXME: create operation in frontend and send a signed operation
    // without any private key
) {
    // parameters that will be used for the paymaster
    let paymasterMiddleware = undefined;
    const overrideBundleRpc: string = "";

    if (withPaymaster) {
        if (process.env.PAYMASTER_LINK != undefined) {
            const paymaster: PaymasterParameters = {
                paymasterUrl: process.env.PAYMASTER_LINK,
                paymasterContext: {
                    type: PAYMASTER_DEFAULT_CONTEXT
                }
            }
            paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
                paymaster.paymasterUrl,
                paymaster.paymasterContext
            );
        }
    }

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

    console.log(`Transferring ${tokenAmount} of ${symbol}`);

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

    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);


    // when the transaction is done, send the data to the decentralized storage
    // the operation is not async, because we want to return the transaction validity to
    // the frontend. In case the database writing is failed, run the worker to try again
    // or to report the error

    const walletPublicAddress = await resolveAddress(privateKey);
    addLoyoTransferToDecentralisedStorage(
        walletPublicAddress,
        recipientAddress,
        tokenAmount,
        tokenAddress,
        null // for instance no item ids provided, feature to develop
    );
}


async function addLoyoTransferToDecentralisedStorage(
    userPublicKey: string,
    recipientAddress: string,
    tokenAmount: string,
    tokenAddress: string,
    loyoItemId: string | null,
) {
    // to understand whether the transfer is loyalty sharing or spending
    const isSharingWithFriend = !(recipientAddress === tokenAddress);
    const timestamp = Date.now();

    // connect to database
    const privateKey = getDatabaseSignerPrivateKey();
    const wallet = new Wallet(privateKey);
    const provider = getDefaultProvider(getDatabaseProvider());
    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const tableName = getDatabaseName();

    // run the query in the database
    // id will be generated and incremented automatically
    const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} 
            (user_address, recipient_address, amount_spent, item_id, time, is_sharing_with_friend)
            VALUES (?, ?, ?, ?, ?, ?);
        `)
        .bind(userPublicKey, recipientAddress, Number(tokenAmount), loyoItemId, timestamp, isSharingWithFriend)
        .run();

    console.log('request to add data sent...');
    await insert.txn?.wait();
    console.log('data written, fetching results');
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
}


function getBundlerUrl(): string {
    dotenv.config();
    let bundlerUrl: string = "";
    if (process.env.BUNDLER_RPC_URL) {
        bundlerUrl = process.env.BUNDLER_RPC_URL;
    }
    return bundlerUrl
}


function getDatabaseSignerPrivateKey(): string {
    dotenv.config();
    let privateKey: string = "";
    if (process.env.CLIENT_TEST_ACCOUNT_PRIVATE_KEY) {
        privateKey = process.env.CLIENT_TEST_ACCOUNT_PRIVATE_KEY;
    }
    return privateKey
}


function getDatabaseProvider(): string {
    dotenv.config();
    let providerUrl: string = "";
    if (process.env.INFURA_PROVIDER_FOR_DATABASE_CONNECTION) {
        providerUrl = process.env.INFURA_PROVIDER_FOR_DATABASE_CONNECTION;
    }
    return providerUrl
}


function getDatabaseName(): string {
    dotenv.config();
    let databaseName: string = "";
    if (process.env.TABLELAND_TABLE_NAME) {
        databaseName = process.env.TABLELAND_TABLE_NAME;
    }
    return databaseName
}

