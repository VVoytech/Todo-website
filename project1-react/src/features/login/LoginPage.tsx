import {FC} from "react";
import {useForm} from "@mantine/form";
import {Button, Stack, TextInput} from "@mantine/core";
import {loginErrorNotification} from "./notifications.ts";
import {login} from "./api/login.ts";
import {useNavigate} from "react-router-dom";

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
            navigate('/todo');
        } catch (error) {
            loginErrorNotification();
        }
    }

    return (
        <div style={{width: '100%'}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Stack gap="md">
                    <TextInput required type="email" label="Email" {...form.getInputProps('email')}/>
                    <TextInput required type="password" label="Password" {...form.getInputProps('password')}/>
                    <Button type="submit">Login</Button>
                </Stack>
            </form>
        </div>
    );
}