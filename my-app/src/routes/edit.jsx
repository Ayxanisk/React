import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { store } from '../redux/store';
import { updateTask } from '../redux/slices/tasksSlice';
export function action({ request, params }) {
    return request.formData().then((formData) => {
        const updates = Object.fromEntries(formData);
        store.dispatch(updateTask({ id: params.taskId, updates }));
        return redirect(`/tasks/${params.taskId}`);
    });
}
export default function EditTask() {
    const { task } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="task-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
                <span>Title</span>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    defaultValue={task?.title}
                    required
                />
            </label>
            <label>
                <span>Description</span>
                <textarea
                    name="description"
                    placeholder="Task description"
                    defaultValue={task?.description}
                    rows={4}
                />
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </div>
        </Form>
    );
}
