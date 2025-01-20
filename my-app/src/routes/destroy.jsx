import { store } from "../redux/store";
import { deleteTask } from "../redux/slices/tasksSlice";
import { redirect } from 'react-router-dom';
import { getTask } from '../tasks';

export async function action({ params }) {
    const task = await getTask(params.taskId);

    if (task === null) {
        console.error('Task not found');
        throw new Error(`Could not find task with ID: ${params.taskId}`);
    }

    store.dispatch(deleteTask(params.taskId));

    return redirect("/");
}

