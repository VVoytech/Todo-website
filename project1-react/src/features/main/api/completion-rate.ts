import {API_URL} from "../../../config.ts";
import ky from "ky";

export const getCompletionRate = async (): Promise<number> => {
    const response = await ky.get(`${API_URL}/todo/completion-rate`, { credentials: "include" }).json<{ completionRate: number }>();
    return response.completionRate;
};