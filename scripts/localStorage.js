export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

export function saveCategory(category) {
    const categories = getCategories();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}
