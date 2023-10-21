import LoyoAccounts from "./features/LoyoAccounts";
import LoyoPrebundler from "./features/LoyoPreBundler";

class LoyoClient {

    public accounts: LoyoAccounts;
    public prebundler: LoyoPrebundler;

    constructor() {

        this.accounts = new LoyoAccounts();
        this.prebundler = new LoyoPrebundler();
    }
};

export const loyoClient = new LoyoClient();

export default LoyoClient;