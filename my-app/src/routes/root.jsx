import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { createTask, getTasks } from '../tasks';
import { useEffect } from 'react';

export async function action() {
    const task = await createTask();
    return redirect(`/tasks/${task.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const tasks = await getTasks(q);
    return { tasks, q };
}

export default function Root() {
    const { tasks, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>Task Manager</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search tasks"
                            placeholder="Search tasks"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New Task</button>
                    </Form>
                </div>
                <nav>
                    {tasks.length ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <NavLink
                                        to={`tasks/${task.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? 'active'
                                                : isPending
                                                    ? 'pending'
                                                    : ''
                                        }
                                    >
                                        {task.title || <i>No Title</i>}{' '}
                                        {task.completed && <span>✔</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No tasks</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={
                    navigation.state === 'loading' ? 'loading' : ''
                }
            >
                <Outlet />
            </div>
        </>
    );
}
