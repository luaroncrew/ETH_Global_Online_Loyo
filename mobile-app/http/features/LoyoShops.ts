import DefaultLoyoClient from "../DefaultLoyoClient";

interface IShop {
    address: string,
    name: string,
    items: Array<{ name: string, price: number }>
}

export type GetShopResponse = IShop;
export type GetShopsResponse = Array<IShop>;

export type GetBalanceResponse = {
    balance: string,
    fidelity: Array<{}>
};

class LoyoShops {

    async getOne(shopAddress: string) {

        const { data } = await DefaultLoyoClient.get<GetShopResponse>(`/shop/${shopAddress}`);

        return data;
    }

    async getBalance(publicKey: string, shopAddress: string) {

        const { data } = await DefaultLoyoClient.get<GetBalanceResponse>(`/shop/${shopAddress}/balance/${publicKey}`);

        return data;
    }

    async getMany() {

        const { data } = await DefaultLoyoClient.get<GetShopsResponse>(`/shop`);

        return data;
    }
};

export default LoyoShops;