import {Button, Card, Checkbox, Image, Text} from "@mantine/core";
import {TodoType} from "../../types/TodoType.ts";
import {CSSProperties, FC, memo, useState} from "react";
import {deleteTodo} from "./api/delete-todo.ts";
import {IconTrash} from "@tabler/icons-react";
import {editTodo} from "./api/edit-todo.ts";
import {TodoFormValues} from "../../types/TodoFormValues.ts";
import {deleteTodoNotification} from "./api/notifications.ts";
import {useNavigate} from "react-router-dom";
import todoImage from '../../assets/logo.png';


interface TodoListItemProps {
    item: TodoType;
    onToggleDone: (id: number, done: boolean) => void;
    onTodoDeleted: (id: number) => void;
}

export const TodoListItem: FC<TodoListItemProps> = memo(({item, onTodoDeleted, onToggleDone}) => {
    const [isDone, setIsDone] = useState(item.done);
    const navigate = useNavigate();

    const style: CSSProperties = {
        border: "1px solid",
        borderColor: isDone ? "rgba(194,0,0,0.72)" : "rgba(0,194,0,0.72)"
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(item.id);
            onTodoDeleted(item.id);
            deleteTodoNotification();
        } catch (error) {
            console.error("Błąd podczas usuwania todo:", error);
            alert("Nie udało się usunąć todo.");
        }
    };

    const handleToggle = async (checked: boolean) => {
        try {
            setIsDone(checked)
            const updatedTodo: TodoFormValues = {
                title: item.title,
                content: item.content,
                done: checked,
            };
            await editTodo(updatedTodo, item.id);
            onToggleDone(item.id, checked);
        } catch (error) {
            console.error("Błąd podczas modyfikowania todo:", error);
            alert("Nie udało się zmodyfikować todo.");
        }
    };

    const handleEdit = () => {
        navigate(`/todo/edit/${item.id}`);
    };

    return (
        <Card
            shadow="sm"
            style={style}
        >
            <Card.Section>
                <Image
                    src={todoImage}
                    h={200}
                    alt="No way"
                />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
                {item.title}
            </Text>

            <Text mt="xs" size="sm" c="dimmed">
                {item.content}
            </Text>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px"}}>
                <Button
                    onClick={handleDelete}
                    color="red"
                    size="xs"
                >
                    <IconTrash size={14}/>
                </Button>

                <Button onClick={handleEdit} size="xs">Edit</Button>

                <Checkbox
                    checked={isDone}
                    onChange={(event) => handleToggle(event.currentTarget.checked)}
                    label="Status Todo"
                />
            </div>

        </Card>
    );
});