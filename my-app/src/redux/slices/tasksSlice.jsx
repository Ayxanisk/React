import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    filter: 'all',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        toggleTaskStatus: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        editTask: (state, action) => {
            const { id, title, description } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.description = description;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        updateTask: (state, action) => {
            const { id, updates } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                Object.assign(task, updates);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
    },
});

export const {
    addTask,
    toggleTaskStatus,
    deleteTask,
    editTask,
    setFilter,
    updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
