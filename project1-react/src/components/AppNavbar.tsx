import {NavLink} from "@mantine/core"
import {useNavigate} from "react-router-dom"
import {IconHome2, IconListCheck, IconLogout, IconPencilPlus} from "@tabler/icons-react";
import {logout} from "../features/login/api/logout.ts";

export const AppNavbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => {
            navigate("/login")
        })
    }

    return (
        <div>
            <NavLink
                onClick={() => navigate("/main")}
                label="Strona główna"
                leftSection={<IconHome2 size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate("/todo")}
                label="Lista ToDo"
                leftSection={<IconListCheck size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate("/todo/new")}
                label="Dodaj ToDo"
                leftSection={<IconPencilPlus size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={handleLogout}
                label="Wyloguj się"
                leftSection={<IconLogout size="1rem" stroke={1.5}/>}
            />
        </div>
    )
}