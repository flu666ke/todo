const storage = {
    setItem: (itemName, item) => localStorage.setItem(itemName, item),
    getItem: itemName => localStorage.getItem(itemName),
    removeItem: itemName => localStorage.removeItem(itemName)
}

export const setTaskToStorage = (tasks) => {
    storage.setItem('tasks', JSON.stringify(tasks))
}

export const getTaskFromStorage = () => {
    return JSON.parse(storage.getItem('tasks'))
}