import storage from "./storage";

export const setTaskToStorage = (tasks) => {
    storage.setItem('tasks', JSON.stringify(tasks))
}

export const getTaskFromStorage = () => {
    return JSON.parse(storage.getItem('tasks'))
}