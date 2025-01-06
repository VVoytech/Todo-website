import {showNotification} from "@mantine/notifications";

export const addTodoNotification = () => {
    showNotification({
        color: "green",
        title: "Dodano todo",
        message: "Dodanie powiodło się!",
    })
}