import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {TodoList} from "./todo/TodoList.tsx";
import {TodoForm} from "./todo/TodoForm.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";
import { LoginPage } from "./login/LoginPage.tsx";
import {useIsLogged} from "../hooks/useIsLogged.ts";
import { MainPage } from "./main/MainPage.tsx";


const publicRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '*',
                element: <Navigate to="/login" replace/>
            }
        ]
    }
];

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/main',
                element: <MainPage/>
            },
            {
                path: '/todo',
                element: <TodoList/>
            },
            {
                path: '/todo/new',
                element: <TodoForm/>
            },
            {
                path: '/todo/:id',
                element: <TodoForm/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}