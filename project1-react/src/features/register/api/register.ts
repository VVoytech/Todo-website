import ky from "ky";
import {API_URL} from "../../../config.ts";
import {UserType} from "../../../types/UserType.ts";

export const register = async (data: UserType) => {
    return ky.post(`${API_URL}/user`, {json: data, credentials: "include"}).json<UserType>();
}