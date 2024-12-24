const API_URL = "http://localhost:3000/tasks";

// fetch tasks and render 
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}

//Render task list
function renderTasks(tasks) {
    console.log("Rendering tasks:", tasks);  // Check if tasks are passed correctly
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description provided'}</p>
            <label>
              Status:
              <select onChange="updateTaskStatus('${task._id}', this.value)">
                <option value="To Do" ${task.status === 'To Do' ? 'selected' : ''}> To Do</option>
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Done" ${task.status === 'Done' ? 'selected' : ''}>Done</option>
              </select>
            </label>
            <button class="delete-btn" onClick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}


//create new task 
document.getElementById('task-form').addEventListener('submit', async(e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ title, description }),
    });

    document.getElementById('task-form').reset();
    fetchTasks();
});


//update task status 
async function updateTaskStatus(id, status) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ status }),
    });
    fetchTasks();
}

//delete task
async function deleteTask(id) {
    const confirmation = confirm("Are you sure you want to delete this task?");
    if(!confirmation) return;

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    fetchTasks();
}

fetchTasks();