import {showNotification} from "@mantine/notifications";

export const registerErrorNotification = () => {
    showNotification({
        color: "red",
        title: "Error",
        message: "Register Failed",
    })
}

export const badPasswordNotification = () => {
    showNotification({
        color: "red",
        title: "Error",
        message: "Hasła nie są takie same",
    })
}

export const registerSuccessNotification = () => {
    showNotification({
        color: "green",
        title: "Sukces",
        message: "Konto zostało założone",
    })
}