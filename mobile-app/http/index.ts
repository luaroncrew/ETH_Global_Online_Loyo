import LoyoAccounts from "./features/LoyoAccounts";

class LoyoClient {

    public accounts: LoyoAccounts;

    constructor() {

        this.accounts = new LoyoAccounts();
    }
};

export const loyoClient = new LoyoClient();

export default LoyoClient;