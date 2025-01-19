export async function createTask() {
    const newTask = {
        title: '',
        description: '',
        completed: false,
    };
    const savedTask = await saveTaskToDatabase(newTask);
    return savedTask;
}
