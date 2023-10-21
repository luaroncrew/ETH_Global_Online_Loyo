import DefaultLoyoClient from "../DefaultLoyoClient";

type GetBalanceResponse = Array<{ name: string, balance: number }>;
type GetQrResponse = { qrCode: string };

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

        const { data } = await this.client.get<GetQrResponse>(`/account/${publicKey}/qr`);

        return data;
    }
};

export default LoyoAccounts;