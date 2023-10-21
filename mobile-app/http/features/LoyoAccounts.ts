import DefaultLoyoClient from "../DefaultLoyoClient";

type GetBalanceResponse = Array<{ name: string, balance: number }>;
type GetQrResponse = { qrCode: string };
type SetupWalletResponse = { publicKey: string };

class LoyoAccounts {

    private client: DefaultLoyoClient;

    constructor() {

        this.client = new DefaultLoyoClient();
    }

    async getBalance(publicKey: string) {

        const { data } = await this.client.get<GetBalanceResponse>(`/account/${publicKey}/balance`);

        return data;
    }

    async getQr(publicKey: string) {

        const { data } = await this.client.post<GetQrResponse>("/qr", { address: publicKey });

        return data;
    }

    async setupWallet(privateKey: string) {

        const { data } = await this.client.post<SetupWalletResponse>("/user-opration/setup-wallet", {
            address: privateKey
        });

        return data;
    }
};

export default LoyoAccounts;