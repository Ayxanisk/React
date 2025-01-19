import { Form, useLoaderData } from 'react-router-dom';
import { getTask,updateTask } from '../tasks';

export async function loader({ params }) {
    const task = await getTask(params.taskId);

    return { task };
}
export async function action({ request, params }) {
    const formData = await request.formData();
    const favorite = formData.get('favorite') === 'true';
    const completed = formData.get('completed') === 'true';

    await updateTask(params.taskId, { favorite, completed  });

    return null;
}

export default function Task() {
    const { task } = useLoaderData();

    return (
        <div id="task">
            <div>
                <h1>
                    {task.title || <i>Untitled</i>} <Favorite task={task} />
                </h1>

                <p>{task.description || 'No description'}</p>

                <p>
                    <Form method="post">
                        <button
                            name="completed"
                            value={task.completed ? 'false' : 'true'}
                            aria-label={
                                task.completed ? 'Not Completed' : 'Completed'
                            }
                        >
                            {task.completed ? 'Not Completed' : 'Completed'}
                        </button>
                    </Form>
                </p>

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !window.confirm(
                                    'Are you sure you want to delete this task??',
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ task }) {
    const favorite = task.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? 'false' : 'true'}
                aria-label={
                    favorite
                        ? 'Remove from favorites'
                        : 'Add in favorites'
                }
            >
                {favorite ? '★' : '☆'}
            </button>
        </Form>
    );
}

