export async function getTasks(query) {
    const allTasks = await fetchTasksFromDatabase();
    if (query) {
        return allTasks.filter((task) =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    }
    return allTasks;
}
