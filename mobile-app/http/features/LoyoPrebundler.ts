import DefaultLoyoClient from "../DefaultLoyoClient";

type SpendLoyaltyResponse = {};
type SetupWalletResponse = { publicKey: string };

class LoyoPrebundler {

    private client: DefaultLoyoClient;

    constructor() {

        this.client = new DefaultLoyoClient();
    }

    async spendLoyalty(privateKey: string, recipientAddress: string, tokenAddress: string, tokenAmount: string) {

        const { data } = await this.client.post<SpendLoyaltyResponse>("/pre-bundler/user-operation/spend-loyalty", {
            privateKey,
            recipientAddress,
            tokenAddress,
            tokenAmount
        });

        return data;
    }

    async setupWallet(privateKey: string) {

        const { data } = await this.client.post<SetupWalletResponse>("/pre-bundler/user-operation/setup-wallet", {
            privateKey
        });

        return data;
    }
};

export default LoyoPrebundler;