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
    const filter = url.searchParams.get("filter"); // Новый параметр
    const allTasks = await getTasks(q);

    let tasks = allTasks;
    if (filter === "completed") {
        tasks = allTasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
        tasks = allTasks.filter(task => !task.completed);
    }

    return { tasks, q, filter };
}


export default function Root() {
    const { tasks, q, filter } = useLoaderData();
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
                        <button type="submit">New</button>
                    </Form>
                    <Form>
                        <button
                            type="submit"
                            name="filter"
                            value="all"
                            className={filter === "all" ? "active" : ""}
                        >
                            Show All
                        </button>
                    </Form>
                    <Form>

                        <button
                            type="submit"
                            name="filter"
                            value="completed"
                            className={filter === "completed" ? "active" : ""}
                        >
                            Show Completed
                        </button>
                    </Form>
                    <Form>

                        <button
                            type="submit"
                            name="filter"
                            value="incomplete"
                            className={filter === "incomplete" ? "active" : ""}
                        >
                            Show Incomplete
                        </button>
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
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {task.title || <i>No Title</i>}{" "}
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
                    navigation.state === "loading" ? "loading" : ""
                }
            >
                <Outlet />
            </div>
        </>
    );
}
