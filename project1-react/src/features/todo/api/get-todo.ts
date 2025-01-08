import ky from "ky";
import {API_URL} from "../../../config.ts";
import {TodoType} from "../../../types/TodoType.ts";

export const oneTodo = async (id: number) => {
    return ky.get(`${API_URL}/todo/${id}`, {credentials: "include"}).json<TodoType>();
}