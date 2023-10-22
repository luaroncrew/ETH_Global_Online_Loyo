import DefaultLoyoClient from "../DefaultLoyoClient";

type SpendLoyaltyResponse = {};
type SetupWalletResponse = { publicKey: string };

class LoyoPrebundler {

    async spendLoyalty(privateKey: string, recipientAddress: string, tokenAddress: string, tokenAmount: string) {

        const { data } = await DefaultLoyoClient.post<SpendLoyaltyResponse>("/pre-bundler/user-operation/spend-loyalty", {
            privateKey,
            recipientAddress,
            tokenAddress,
            tokenAmount
        });

        return data;
    }

    async setupWallet(privateKey: string) {

        const { data } = await DefaultLoyoClient.post<SetupWalletResponse>("/pre-bundler/user-operation/setup-wallet", {
            privateKey
        });

        return data;
    }
};

export default LoyoPrebundler;