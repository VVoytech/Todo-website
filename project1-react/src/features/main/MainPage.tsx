import {FC, useEffect, useState} from "react";
import {deadlineTodo} from "./api/deadline-todo.ts";
import {TodoListComponent} from "../todo/TodoListComponent.tsx";
import {useTodoData} from "../../hooks/useTodoData.ts";
import {Box, Divider, RingProgress, Text} from "@mantine/core";
import {getCompletionRate} from "./api/completion-rate.ts";

export const MainPage: FC = () => {
    const { data, handleTodoDeleted, handleToggleDone } = useTodoData(deadlineTodo);
    const [completionRate, setCompletionRate] = useState<number | null>(null);

    useEffect(() => {
        // Pobranie procentu ukończonych zadań
        getCompletionRate().then((rate) => setCompletionRate(rate));
    }, []);

    return (
        <Box style={{ width: "100%", padding: "20px" }}>
            <Box mb="20px">
                <Text fw={500} size="lg" mt="md">
                    Dodatkowe statystyki
                </Text>

                <Divider my="sm" />
                <RingProgress
                    size={240}
                    thickness={20}
                    roundCaps
                    label={
                        <Text size="sm" ta="center" mt="md">
                            Procent wykonanych Todo
                        </Text>
                    }
                    sections={[
                        { value: completionRate ?? 0, color: 'green' },
                    ]}
                />
                <Divider my="sm" />
            </Box>

            <Text fw={500} size="lg" mt="md">
                Todo blisko końca terminu
            </Text>

            <Divider my="sm" />

            <TodoListComponent
                data={data}
                onTodoDeleted={handleTodoDeleted}
                onToggleDone={handleToggleDone}
            />
        </Box>
    );
};