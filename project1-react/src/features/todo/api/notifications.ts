import {showNotification} from "@mantine/notifications";

export const addTodoNotification = () => {
    showNotification({
        color: "green",
        title: "Sukces",
        message: "Dodanie powiodło się!",
    })
}

export const editTodoNotification = () => {
    showNotification({
        color: "green",
        title: "Sukces",
        message: "Edytowanie powiodło się!",
    })
}

export const deleteTodoNotification = () => {
    showNotification({
        color: "green",
        title: "Usunięto todo",
        message: "Usuwanie powiodło się!",
    })
}