//third-party imports
import axios from "axios";

export const instance = axios.create(
    {
        baseURL: "/api/",

        // sets the network timeout
        timeout: 3000
    }
);