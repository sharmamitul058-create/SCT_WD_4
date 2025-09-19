document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Function to create a new task item
    const createTaskItem = (taskText) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(actions);

        return li;
    };

    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = createTaskItem(taskText);
            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    });

    // Event listener for handling clicks on the task list
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const parentLi = target.closest('.task-item');

        if (!parentLi) return;

        // Mark task as completed/uncompleted
        if (target.classList.contains('task-text')) {
            target.classList.toggle('completed');
        }

        // Edit a task
        if (target.classList.contains('edit-btn')) {
            const taskSpan = parentLi.querySelector('.task-text');
            const newTaskText = prompt('Edit your task:', taskSpan.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskSpan.textContent = newTaskText.trim();
            }
        }

        // Delete a task
        if (target.classList.contains('delete-btn')) {
            taskList.removeChild(parentLi);
        }
    });

    // Allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
