import {TodoFormValues} from "../../../types/TodoFormValues.ts";
import {TodoType} from "../../../types/TodoType.ts";
import {API_URL} from "../../../config.ts";
import ky from "ky";

export const createTodo = async (data: TodoFormValues) => {
    return ky.post(`${API_URL}/todo`, {json: data, credentials: "include"}).json<TodoType>();
}