import ky from "ky";
import {API_URL} from "../../../config.ts";

export const deleteTodo = async (id: number) => {
    return ky.delete(`${API_URL}/todo/${id}`, { credentials: "include" });
}