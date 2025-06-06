
    let use24Hour = true;

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

        // Toggle button logic
        document.getElementById('toggleFormatBtn').addEventListener('click', () => {
            use24Hour = !use24Hour;
            updateHourLabels();
            document.getElementById('toggleFormatBtn').textContent = use24Hour ? '12-hour' : '24-hour';
        });

        // Call once on load to apply current format
        updateHourLabels();

    // Populate 24-hour blocks
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

    // Toggle dropdown menu
    const plusBtn = document.querySelector('.plus-btn');
    const optionsMenu = document.getElementById('optionsMenu');

    plusBtn.addEventListener('click', () => {
        optionsMenu.style.display = optionsMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Start task logic
    let taskInterval;
    function startTask() {
        optionsMenu.style.display = 'none';

        const now = new Date();
        const currentHour = now.getHours();
        const minute = now.getMinutes();

        const hourBlock = document.querySelector(`.hour-block[data-hour='${currentHour}']`);

        const taskFill = document.createElement('div');
        taskFill.className = 'task-fill';
        taskFill.style.width = `${(minute / 60) * 100}%`;

        hourBlock.appendChild(taskFill);

        // Update task block every minute
        clearInterval(taskInterval);
        taskInterval = setInterval(() => {
            const newNow = new Date();
            const newMinute = newNow.getMinutes();
            taskFill.style.width = `${(newMinute / 60) * 100}%`;

            // Stop at end of hour
            if (newNow.getHours() !== currentHour) {
                clearInterval(taskInterval);
            }
        }, 1000 * 10); // every 10 seconds for smoother demo
    }
