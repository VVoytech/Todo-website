import ky from "ky";
import {API_URL} from "../../../config.ts";
import {TodoFormValues} from "../../../types/TodoFormValues.ts";

export const editTodo = async (data: TodoFormValues, id: number) => {
    return ky.put(`${API_URL}/todo/${id}`, { json: data, credentials: "include" });
}