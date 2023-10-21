import { Axios } from "axios";

class DefaultLoyoClient extends Axios {

    constructor(){
        super({ baseURL: "http://localhost:8000" });
    }
};

export default DefaultLoyoClient;