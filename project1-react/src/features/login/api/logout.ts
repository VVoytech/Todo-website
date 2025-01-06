import ky from "ky";
import {API_URL} from "../../../config.ts";

export const logout = async () => {
    return ky.post(`${API_URL}/auth/logout`, {credentials: "include"});
}