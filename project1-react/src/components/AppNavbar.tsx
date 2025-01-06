import {NavLink} from "@mantine/core"
import {useNavigate} from "react-router-dom"
import {IconHome2, IconListCheck, IconPencilPlus} from "@tabler/icons-react";

export const AppNavbar = () => {

    const navigate = useNavigate()

    return (
        <div>
            <NavLink
                onClick={() => navigate("/main")}
                href="#required-for-focus"
                label="Strona główna"
                leftSection={<IconHome2 size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate("/todo")}
                href="#required-for-focus"
                label="Lista ToDo"
                leftSection={<IconListCheck size="1rem" stroke={1.5}/>}
            />
            <NavLink
                onClick={() => navigate("/todo/new")}
                href="#required-for-focus"
                label="Dodaj ToDo"
                leftSection={<IconPencilPlus size="1rem" stroke={1.5}/>}
            />
        </div>
    )
}