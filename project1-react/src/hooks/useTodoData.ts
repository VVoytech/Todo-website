import { useEffect, useState } from "react";
import {TodoType} from "../types/TodoType.ts";

export const useTodoData = (fetchTodos: () => Promise<TodoType[]>) => {
    const [data, setData] = useState<TodoType[]>([]);

    useEffect(() => {
        fetchTodos().then((response) => setData(response));
    }, [fetchTodos]);

    const handleTodoDeleted = (id: number) => {
        setData((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleToggleDone = (id: number, done: boolean) => {
        setData((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo))
        );
    };

    return { data, handleTodoDeleted, handleToggleDone };
};
