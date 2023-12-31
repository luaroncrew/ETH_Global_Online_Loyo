import DefaultLoyoClient from "../DefaultLoyoClient";

type GetBalanceResponse = Array<{ balance: string, fidelity: Array<{}> }>;
type GetQrResponse = { qrCode: string };

class LoyoAccounts {

    async getBalance(publicKey: string) {

        const { data } = await DefaultLoyoClient.get<GetBalanceResponse>(`/account/${publicKey}/balance`);

        return data;
    }

    async getQr(publicKey: string) {

        const { data } = await DefaultLoyoClient.get<GetQrResponse>(`/account/${publicKey}/qr`);

        return data;
    }
};

export default LoyoAccounts;