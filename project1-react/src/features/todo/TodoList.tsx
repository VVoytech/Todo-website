import {FC} from "react";
import {listTodo} from "./api/todo.ts";
import {useTodoData} from "../../hooks/useTodoData.ts";
import {TodoListComponent} from "./TodoListComponent.tsx";

export const TodoList: FC = () => {
    const { data, handleTodoDeleted, handleToggleDone } = useTodoData(listTodo);

    return (
        <TodoListComponent
            data={data}
            onTodoDeleted={handleTodoDeleted}
            onToggleDone={handleToggleDone}
        />
    );
};