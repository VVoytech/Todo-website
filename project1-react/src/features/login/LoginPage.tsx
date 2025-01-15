import {FC} from "react";
import {useForm} from "@mantine/form";
import {Anchor, Button, Center, Group, Paper, Stack, TextInput, Title} from "@mantine/core";
import {loginErrorNotification} from "./notifications.ts";
import {login} from "./api/login.ts";
import {useNavigate} from "react-router-dom";
import {Notifications} from "@mantine/notifications";

type LoginFromType = {
    email: string;
    password: string;
}

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFromType>({
        initialValues: {
            email: '',
            password: ''
        },
    })

    const handleSubmit = async (data: LoginFromType) => {
        try {
            await login(data.email, data.password);
            navigate('/main');
        } catch (error) {
            loginErrorNotification();
        }
    }

    return (
        <Center style={{ height: '100vh', backgroundColor: '#f7f9fc' }}>
            <Paper
                shadow="md"
                radius="md"
                p="xl"
                style={{ width: 400, maxWidth: '90%', backgroundColor: '#ffffff' }}
            >
                <Title order={2} mb="lg">
                    Witaj z powrotem
                </Title>
                <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                    <Stack gap="md">
                        <TextInput
                            required
                            type="email"
                            label="Email"
                            placeholder="Twój email"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            required
                            type="password"
                            label="Hasło"
                            placeholder="Twoje hasło"
                            {...form.getInputProps('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            style={{ backgroundColor: '#1a73e8', color: 'white' }}
                        >
                            Zaloguj
                        </Button>
                    </Stack>
                </form>

                <Group justify="space-between" mt="md">
                    <Anchor
                        component="button"
                        type="button"
                        onClick={() => navigate("/register")}
                        style={{ fontSize: 14 }}
                    >
                        Nie masz jeszcze konta? Stwórz je
                    </Anchor>
                </Group>

                <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
            </Paper>
        </Center>
    );
}