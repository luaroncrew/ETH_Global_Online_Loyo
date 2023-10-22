import LoyoAccounts from "./features/LoyoAccounts";
import LoyoPrebundler from "./features/LoyoPrebundler";

export const loyoClient = {
    accounts: new LoyoAccounts(),
    prebundler: new LoyoPrebundler(),
};

export default loyoClient