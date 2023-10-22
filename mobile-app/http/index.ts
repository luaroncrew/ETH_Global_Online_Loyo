import LoyoAccounts from "./features/LoyoAccounts";
import LoyoPrebundler from "./features/LoyoPrebundler";
import LoyoShops from "./features/LoyoShops";

export const loyoClient = {
    accounts: new LoyoAccounts(),
    prebundler: new LoyoPrebundler(),
    shops: new LoyoShops(),
};

export default loyoClient