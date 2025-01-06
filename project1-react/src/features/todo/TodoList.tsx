import {SimpleGrid} from "@mantine/core";
import {TodoType} from "../../types/TodoType.ts";
import {TodoListItem} from "./TodoListItem.tsx";
import {FC, useEffect, useState} from "react";
import {listTodo} from "./api/todo.ts";
import {Notifications} from "@mantine/notifications";

export const TodoList: FC = () => {
    const [data, setData] = useState<TodoType[]>([]);

    useEffect(() => {
        listTodo().then((response) => setData(response));
    }, [])

    const handleTodoDeleted = (id: number) => {
        setData((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleToggleDone = (id: number, done: boolean) => {
        setData((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, done } : todo
            )
        );
    };

    return (
        <div style={{width: '100%'}}>
            <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                {data.map((item) => (
                    <TodoListItem
                        key={item.id}
                        item={item}
                        onTodoDeleted={handleTodoDeleted}
                        onToggleDone={handleToggleDone}
                    />
                ))}
            </SimpleGrid>
        </div>
    )
}