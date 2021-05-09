import axios from "axios";
import { BASE_PATH } from "../config/api.config"
let API_URL = `${BASE_PATH}/api/auth/`;

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", { email, password })
            .then((response) => {
                if (response.data.accessToken) {
                    console.log(response.data)
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password, confirmPassword, firstName, lastName) {
        return axios.post(API_URL + "signup", {
            email,
            password,
            confirmPassword,
            firstName,
            lastName
        });
    }
}

export default new AuthService();