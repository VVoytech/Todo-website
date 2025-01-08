import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {register} from "./api/register.ts";
import {Anchor, Button, Center, Group, Paper, Stack, TextInput, Title} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {badPasswordNotification, registerErrorNotification, registerSuccessNotification} from "./notifications.ts";

type RegisterFromType = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<RegisterFromType>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
    })

    const handleSubmit = async (data: RegisterFromType) => {

        if (data.password !== data.confirmPassword) {
            badPasswordNotification();
            return;
        }

        try {
            await register({ email: data.email, password: data.password });
            navigate('/login');
            registerSuccessNotification();
        } catch (error) {
            registerErrorNotification();
        }
    }

    return (
        <Center style={{ height: "100vh", backgroundColor: "#f7f9fc" }}>
            <Paper
                shadow="md"
                radius="md"
                p="xl"
                style={{ width: 400, maxWidth: "90%", backgroundColor: "#ffffff" }}
            >
                <Title order={2} mb="lg">
                    Stwórz konto
                </Title>
                <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                    <Stack gap="md">
                        <TextInput
                            required
                            type="email"
                            label="Email"
                            placeholder="Your email"
                            {...form.getInputProps("email")}
                        />
                        <TextInput
                            required
                            type="password"
                            label="Hasło"
                            placeholder="Hasło"
                            {...form.getInputProps("password")}
                        />
                        <TextInput
                            required
                            type="password"
                            label="Potwierdź hasło"
                            placeholder="Confirm your password"
                            {...form.getInputProps("confirmPassword")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            style={{ backgroundColor: "#1a73e8", color: "white" }}
                        >
                            Zarejestruj
                        </Button>
                    </Stack>
                </form>

                <Group justify="space-between" mt="md">
                    <Anchor
                        component="button"
                        type="button"
                        onClick={() => navigate("/login")}
                        style={{ fontSize: 14 }}
                    >
                        Already have an account? Log in
                    </Anchor>
                </Group>

                <Notifications style={{ position: "fixed", top: 60, right: 0 }} />
            </Paper>
        </Center>
    );

}