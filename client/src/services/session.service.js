import axios from "axios";
import { BASE_PATH } from "../config/api.config"
let API_URL = `${BASE_PATH}/api/session/`;

class SessionService {
    destroy() {
        return axios
            .delete(API_URL + "destroy")
    }
}

export default new SessionService();