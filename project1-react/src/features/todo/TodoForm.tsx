import {useTodoForm} from "./hooks/useTodoForm.ts";
import {TodoFormValues} from "../../types/TodoFormValues.ts";
import {Button, Checkbox, Group, Paper, Stack, Textarea, TextInput, Title} from "@mantine/core";
import {createTodo} from "./api/create-todo.ts";
import {Notifications} from "@mantine/notifications";
import {editTodo} from "./api/edit-todo.ts";
import {useNavigate, useParams} from "react-router-dom";
import {oneTodo} from "./api/get-todo.ts";
import {useEffect} from "react";
import {addTodoNotification, editTodoNotification} from "./api/notifications.ts";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export const TodoForm = () => {
    const form = useTodoForm();
    const navigate = useNavigate();
    const { id } = useParams();

    if (id) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const respose = await oneTodo(Number(id));

                    form.setValues({
                        title: respose.title,
                        content: respose.content,
                        done: respose.done,
                        deadline: respose.deadline
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData().then();
        },[])
    }

    const handleSubmit = async (vals: TodoFormValues) => {
        try {
            if (id) {
                const updatedTodo: TodoFormValues = {
                    title: vals.title,
                    content: vals.content,
                    done: vals.done,
                    deadline: vals.deadline,
                };
                await editTodo(updatedTodo, Number(id));
                navigate('/todo');
                editTodoNotification();
            } else {
                await createTodo(vals);
                navigate('/todo/new');
                form.reset();
                addTodoNotification();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Paper shadow="md" radius="md" p="xl" withBorder>
            <Notifications style={{ position: 'fixed', top: 60, right: 20, zIndex: 1000 }} />

            <Title order={3} mb="lg">
                Dodaj nowe ToDo
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        withAsterisk
                        label="Tytuł"
                        placeholder="Tytuł ToDo"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        withAsterisk
                        label="Treść"
                        placeholder="Treść ToDo"
                        minRows={4}
                        {...form.getInputProps('content')}
                    />

                    <div>
                        <label>Deadline</label>
                        <DateTime
                            inputProps={{
                                placeholder: "Wybierz datę i godzinę",
                                ...form.getInputProps("deadline"),
                            }}
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm"
                            onChange={(value) => {
                                form.setFieldValue("deadline", value.toString());
                            }}
                        />
                    </div>

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