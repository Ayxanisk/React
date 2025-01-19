import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Task, {loader as taskLoader,action as  favoriteAction} from "./routes/task";
import EditTask, {action as editTaskAction} from "./routes/edit";
import {action as destroyTaskAction} from "./routes/destroy";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: rootLoader,
        action: rootAction,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'tasks/:taskId',
                element: <Task />,
                loader: taskLoader,
                action: favoriteAction,
            },
            {
                path: 'tasks/:taskId/edit',
                element: <EditTask />,
                loader: taskLoader,
                action: editTaskAction,
            },
            {
                path: 'tasks/:taskId/destroy',
                action: destroyTaskAction,
            },

        ],
    },
]);
export default function App() {
    return <RouterProvider router={router} />;
}
