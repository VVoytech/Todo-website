import {useForm} from "@mantine/form";
import {TodoFormValues} from "../../../types/TodoFormValues.ts";

export const useTodoForm = () => {
    const form = useForm<TodoFormValues>({
        initialValues: {
            content: "",
            title: "",
            done: false,
            deadline: new Date(Date.now())
        },

        validate: {
            title: (value) => {
                if (value.length < 3) {
                    return "Title must be at least 3 characters.";
                }
            },
            content: (value) => {
                if (value.length < 10) {
                    return "Description must be at least 10 characters.";
                }
            }
        },
    });

    return form
}