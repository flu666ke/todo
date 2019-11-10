const storage = {
    setItem: (itemName, item) => localStorage.setItem(itemName, item),
    getItem: itemName => localStorage.getItem(itemName),
    removeItem: itemName => localStorage.removeItem(itemName)
}

export default storage