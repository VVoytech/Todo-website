import {Outlet} from "react-router-dom";
import {AppNavbar} from "./AppNavbar.tsx";
import {AppShell, Burger, Group, useMantineTheme} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import logo from '../assets/logo.png';


export const Layout = () => {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();

    return (
        <AppShell
            padding="md"
            header={{
                height: 60,
            }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header style={{ backgroundColor: theme.colors.blue[6], color: "white" }}>
                <Group h="100%" px="md" justify="space-between">

                    <img
                        src={logo}
                        alt="Logo"
                        style={{height: 40}}
                    />

                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white"/>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" style={{backgroundColor: theme.colors.gray[0]}}>
                <AppNavbar/>
            </AppShell.Navbar>

            <AppShell.Main style={{ backgroundColor: theme.colors.gray[1], borderRadius: 8 }}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};