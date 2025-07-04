document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    // Enable Enter key for adding tasks
    const input = document.getElementById('taskInput');
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task._id || '';
    li.className = task.completed ? 'completed animate-complete' : '';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.onchange = () => toggleComplete(li, task, checkbox);

    li.appendChild(checkbox);

    // Task text
    const span = document.createElement('span');
    span.textContent = task.title;
    span.style.flex = '1';
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(li, task);
    li.appendChild(editBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(li, task);
    li.appendChild(delBtn);

    return li;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (!title) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(task => {
        document.getElementById('taskList').appendChild(createTaskElement(task));
        input.value = '';
    });
}

function loadTasks() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById('taskList');
            list.innerHTML = '';
            tasks.forEach(task => list.appendChild(createTaskElement(task)));
        });
}

function deleteTask(li, task) {
    fetch(`/api/tasks/${task._id}`, { method: 'DELETE' })
        .then(() => {
            li.remove();
        });
}

function toggleComplete(li, task, checkbox) {
    fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: checkbox.checked })
    })
    .then(res => res.json())
    .then(updated => {
        li.classList.toggle('completed', updated.completed);
        li.classList.add('animate-complete');
        setTimeout(() => li.classList.remove('animate-complete'), 400);
        task.completed = updated.completed;
    });
}

function editTask(li, task) {
    const span = li.querySelector('span');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.title;
    input.style.flex = '1';

    input.onkeydown = (e) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    };

    function saveEdit() {
        const newTitle = input.value.trim();
        if (!newTitle) return;
        fetch(`/api/tasks/${task._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })
        .then(res => res.json())
        .then(updated => {
            task.title = updated.title;
            span.textContent = updated.title;
            li.replaceChild(span, input);
        });
    }

    function cancelEdit() {
        li.replaceChild(span, input);
    }

    li.replaceChild(input, span);
    input.focus();
}