import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export async function getTasks(query) {
    await fakeNetwork(`getTasks:${query}`);
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (query) {
        tasks = matchSorter(tasks, query, { keys: ['title', 'description'] });
    }
    return tasks.sort(sortBy('createdAt'));
}

export async function createTask() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let task = {
        id,
        title: 'New Task',
        description: '',
        completed: false,
        createdAt: Date.now(),
    };
    let tasks = await getTasks();
    tasks.unshift(task);
    set(tasks);
    return task;
}

export async function getTask(id) {
    await fakeNetwork(`task:${id}`);
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
}

export async function updateTask(id, updates) {
    await fakeNetwork();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error(`No task found for ID ${id}`);
    Object.assign(task, updates);
    set(tasks);
    return task;
}

export async function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = tasks.findIndex((task) => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        set(tasks);
        return true;
    }
    return false;
}

function set(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 500);
    });
}
