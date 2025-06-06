// js/day-time-blocks.js
let use24Hour = true;
let taskInterval;
let activeTaskFill = null;
let currentTaskMeta = null;


function updateHourLabels() {
    const hourBlocks = document.querySelectorAll('.hour-block');
    hourBlocks.forEach((block, i) => {
        const label = block.querySelector('.hour-label');
        if (use24Hour) {
            label.textContent = `${i}:00`;
        } else {
            const ampm = i >= 12 ? 'PM' : 'AM';
            const hour = i % 12 === 0 ? 12 : i % 12;
            label.textContent = `${hour} ${ampm}`;
        }
    });
}

document.getElementById('toggleFormatBtn').addEventListener('click', () => {
    use24Hour = !use24Hour;
    updateHourLabels();
    document.getElementById('toggleFormatBtn').textContent = use24Hour ? '12-hour' : '24-hour';
});

updateHourLabels();

const calendar = document.getElementById('calendar');
for (let i = 0; i < 24; i++) {
    const hourBlock = document.createElement('div');
    hourBlock.className = 'hour-block';
    hourBlock.dataset.hour = i;

    const label = document.createElement('div');
    label.className = 'hour-label';
    label.textContent = `${i}:00`;

    hourBlock.appendChild(label);
    calendar.appendChild(hourBlock);
}

const plusBtn = document.querySelector('.plus-btn');
const optionsMenu = document.getElementById('optionsMenu');

plusBtn.addEventListener('click', () => {
    optionsMenu.style.display = optionsMenu.style.display === 'flex' ? 'none' : 'flex';
});

function createStopUI(hourBlock, taskFill, startMinute, taskKey = null) {
    if (document.querySelector('.stop-ui')) return;

    const stopUI = document.createElement('div');
    stopUI.className = 'stop-ui';

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Task name';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Enter';

    stopBtn.addEventListener('click', () => {
        stopUI.appendChild(nameInput);
        stopUI.appendChild(colorInput);
        stopUI.appendChild(saveBtn);
        stopBtn.style.display = 'none';
    });

    deleteBtn.addEventListener('click', () => {
        taskFill.remove();
        stopUI.remove();
        if (taskKey) {
            localStorage.removeItem(taskKey);
        }
    });

    saveBtn.addEventListener('click', () => {
        const taskName = nameInput.value;
        const taskColor = colorInput.value;
        const endMinute = new Date().getMinutes();
        const duration = endMinute >= startMinute ? endMinute - startMinute : 60 - startMinute + endMinute;

        taskFill.style.backgroundColor = taskColor;
        taskFill.setAttribute('data-name', taskName);
        taskFill.innerHTML = `<span class="task-text">${taskName} - ${duration} min</span>`;

        const taskData = {
            name: taskName,
            color: taskColor,
            hour: hourBlock.dataset.hour,
            duration: duration
        };

        const newKey = taskKey || `task-${Date.now()}`;
        localStorage.setItem(newKey, JSON.stringify(taskData));
        stopUI.remove();
        activeTaskFill = null;
        currentTaskMeta = null;
    });

    stopUI.appendChild(stopBtn);
    stopUI.appendChild(deleteBtn);
    hourBlock.appendChild(stopUI);
}

function startTask() {
    optionsMenu.style.display = 'none';

    const now = new Date();
    const currentHour = now.getHours();
    const startMinute = now.getMinutes();

    const hourBlock = document.querySelector(`.hour-block[data-hour='${currentHour}']`);

    const taskFill = document.createElement('div');
    taskFill.className = 'task-fill';
    taskFill.style.height = `${(startMinute / 60) * 100}%`;
    taskFill.style.top = 0;
    taskFill.style.left = '60px';
    taskFill.style.width = 'calc(100% - 60px)';
    taskFill.tabIndex = 0;

    activeTaskFill = taskFill;
    currentTaskMeta = { hourBlock, startMinute };

    hourBlock.appendChild(taskFill);

    clearInterval(taskInterval);
    taskInterval = setInterval(() => {
        const newNow = new Date();
        const newMinute = newNow.getMinutes();
        taskFill.style.height = `${(newMinute / 60) * 100}%`;

        if (newNow.getHours() !== currentHour) {
            clearInterval(taskInterval);
        }
    }, 10000);
}

calendar.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-fill')) {
        clearInterval(taskInterval);
        const hourBlock = e.target.closest('.hour-block');
        const startMinute = parseInt((parseFloat(e.target.style.height) / 100) * 60);
        createStopUI(hourBlock, e.target, startMinute, e.target.dataset.key);
    }
});

calendar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.classList.contains('task-fill')) {
        clearInterval(taskInterval);
        const hourBlock = document.activeElement.closest('.hour-block');
        const startMinute = parseInt((parseFloat(document.activeElement.style.height) / 100) * 60);
        createStopUI(hourBlock, document.activeElement, startMinute, document.activeElement.dataset.key);
    }
});

// Clear local storage and start fresh
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('task-')) {
        localStorage.removeItem(key);
    }
});

// Load tasks from localStorage
window.addEventListener('load', () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('task-')) {
            const task = JSON.parse(localStorage.getItem(key));
            const hourBlock = document.querySelector(`.hour-block[data-hour='${task.hour}']`);
            const taskFill = document.createElement('div');
            taskFill.className = 'task-fill';
            taskFill.style.height = `${(task.duration / 60) * 100}%`;
            taskFill.style.top = 0;
            taskFill.style.left = '60px';
            taskFill.style.width = 'calc(100% - 60px)';
            taskFill.style.backgroundColor = task.color;
            taskFill.tabIndex = 0;
            taskFill.innerHTML = `<span class="task-text">${task.name} - ${task.duration} min</span>`;
            taskFill.dataset.key = key;

            hourBlock.appendChild(taskFill);
        }
    });
});
