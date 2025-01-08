import ky from "ky";
import {API_URL} from "../../../config.ts";
import {TodoType} from "../../../types/TodoType.ts";

export const deadlineTodo = async () => {
    return ky.get(`${API_URL}/todo/time`, {credentials: "include"}).json<TodoType[]>();
}