import DefaultLoyoClient from "../DefaultLoyoClient";

interface IShop {
    address: string,
    name: string,
    balance: string,
    hasFidelityCard: boolean,
    items: Array<{ name: string, price: number }>
}

export type GetShopResponse = IShop;
export type GetShopsResponse = Array<IShop>;

class LoyoShops {

    async getOne(shopAddress: string) {

        const { data } = await DefaultLoyoClient.get<GetShopResponse>(`/shop/${shopAddress}`);

        return data;
    }

    async getMany() {

        const { data } = await DefaultLoyoClient.get<GetShopsResponse>(`/shop`);

        return data;
    }
};

export default LoyoShops;