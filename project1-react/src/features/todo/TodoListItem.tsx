import {Button, Card, Checkbox, Image, Spoiler, Text} from "@mantine/core";
import {TodoType} from "../../types/TodoType.ts";
import {CSSProperties, FC, memo, useEffect, useState} from "react";
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
    const [timeLeft, setTimeLeft] = useState<string>('');
    const navigate = useNavigate();

    const style: CSSProperties = {
        border: "2px solid",
        borderColor: isDone ? "rgba(194,0,0,0.72)" : "rgba(0,194,0,0.72)"
    };

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const deadline = new Date(item.deadline);
            const difference = deadline.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft("Termin minął");
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);

            setTimeLeft(`${days} dni, ${hours} godzin, ${minutes} minut`);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(timer);
    }, [item.deadline]);

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
                deadline: item.deadline,
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

            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                <Text mt="xs" size="sm" c="dimmed">
                    {item.content}
                </Text>
            </Spoiler>

            <Text mt="xs" size="sm" c="dimmed">
                <strong>Czas końca terminu:</strong> {timeLeft}
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