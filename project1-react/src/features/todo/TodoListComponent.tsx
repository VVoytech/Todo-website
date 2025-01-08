import {FC} from "react";
import {SimpleGrid} from "@mantine/core";
import {TodoType} from "../../types/TodoType.ts";
import {Notifications} from "@mantine/notifications";
import {TodoListItem} from "./TodoListItem.tsx";

interface TodoListComponentProps {
    data: TodoType[];
    onTodoDeleted: (id: number) => void;
    onToggleDone: (id: number, done: boolean) => void;
}

export const TodoListComponent: FC<TodoListComponentProps> = ({
    data,
    onTodoDeleted,
    onToggleDone,
}) => {
    return (
        <div style={{ width: "100%" }}>
            <Notifications style={{ position: "fixed", top: 60, right: 0 }} />
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {data.map((item) => (
                    <TodoListItem
                        key={item.id}
                        item={item}
                        onTodoDeleted={onTodoDeleted}
                        onToggleDone={onToggleDone}
                    />
                ))}
            </SimpleGrid>
        </div>
    );
};
