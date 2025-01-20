import { redirect } from 'react-router-dom';
import { getTask,deleteTask } from '../tasks';

export async function action({ params }) {
    const task = await getTask(params.taskId);

    if (task === null) {
        console.error('Task not found');
        throw new Error(`Could not find task with ID: ${params.taskId}`);
    }

    await deleteTask(params.taskId);


    return redirect("/");
}