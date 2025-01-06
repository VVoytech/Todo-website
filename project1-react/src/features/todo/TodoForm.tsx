import {useTodoForm} from "./hooks/useTodoForm.ts";
import {TodoFormValues} from "../../types/TodoFormValues.ts";
import {Button, Checkbox, Group, Paper, Stack, Textarea, TextInput} from "@mantine/core";
import {createTodo} from "./api/create-todo.ts";
import {Notifications} from "@mantine/notifications";
import {addTodoNotification} from "./api/notifications.ts";

export const TodoForm = () => {
    const form = useTodoForm();

    const handleSubmit = async (vals: TodoFormValues) => {
        try {
            await createTodo(vals);
            addTodoNotification();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Paper shadow="xs" p="xl">
            <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    <TextInput
                        withAsterisk
                        label="Tytuł"
                        placeholder="Tytuł ToDo"
                        {...form.getInputProps('title')}
                    />

                    <Textarea withAsterisk label="Treść"
                              placeholder="Treść ToDo" {...form.getInputProps('content')}>

                    </Textarea>

                    <Checkbox
                        label="Wykonane"
                        {...form.getInputProps('done', {type: 'checkbox'})}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Wyślij</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}