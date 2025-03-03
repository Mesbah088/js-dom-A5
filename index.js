document.addEventListener("DOMContentLoaded", () => {
    const activityLog = document.getElementById("activity-log");
    const taskCount = document.getElementById("task-count");
    const cardCount = document.querySelector(".card-count");
    const currentDateElement = document.getElementById("current-date");
    const clearHistoryBtn = document.querySelector("#clear-history-btn"); // ✅ Fix: Use an ID
    const taskListContainer = document.getElementById("task-list");

    // Task array (simulating fetched data)
    let tasks = [
        { id: 1, project: "ShopEase", name: "Fix Mobile Button Issue", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly", completed: false },
        { id: 2, project: "CloudSync", name: "Add Dark Mode", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly.", completed: false },
        { id: 3, project: "SwiftPay", name: "Optimize Home Page", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly", completed: false },
        { id: 4, project: "Meta", name: "Add new emoji 🤲", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly", completed: false },
        { id: 5, project: "Google LLC", name: "Integrate OpenAI API", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly.", completed: false },
        { id: 6, project: "Glassdoor", name: "Improve Job Searching", details: "Debug using Chrome DevTools, check for overlapping elements, and ensure onClick works properly", completed: false }
    ];

    // Set current date in UI
    const currentDate = new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'long', year: 'numeric' });
    document.querySelectorAll(".current-date").forEach(span => span.textContent = currentDate);
    currentDateElement.textContent = currentDate;

    // Function to render tasks
    function renderTasks() {
        taskListContainer.innerHTML = ""; // Clear existing tasks
        tasks.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("p-6", "rounded-lg", "shadow-md", "bg-[#F4F7FF]", "border", "border-gray-200");
            taskCard.dataset.taskId = task.id;

            taskCard.innerHTML = `
                <span class="bg-white text-gray-700 px-3 py-1 rounded-full text-xs">${task.project}</span>
                <h2 class="font-bold text-lg mt-2">${task.name}</h2>
                <p class="bg-[#FFFFFF] rounded-md text-sm text-gray-600 mt-1">${task.details}</p>
                <div class="flex gap-4">
                    <p class="text-xs text-gray-500 mt-3">Deadline: <span class="current-date font-semibold">${currentDate}</span></p>
                    <button class="mt-4 px-6 py-2 text-white rounded-lg font-semibold complete-btn ${task.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}" ${task.completed ? 'disabled' : ''}>
                        ${task.completed ? 'Completed' : 'Complete'}
                    </button>
                </div>
            `;

            // Attach event listener only if task is not completed
            if (!task.completed) {
                taskCard.querySelector(".complete-btn").addEventListener("click", () => markTaskComplete(task.id));
            }

            taskListContainer.appendChild(taskCard);
        });

        updateTaskCount();
    }

    // Function to mark task as complete (disable button but keep task)
    function markTaskComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            // Add task completion to activity log
            const logEntry = document.createElement("li");
            logEntry.textContent = `You have task completed: ${task.name} at ${new Date().toLocaleTimeString()}`;
            alert("You have already complete current task")
            activityLog.appendChild(logEntry);
            
            renderTasks();
        }
    }

    // Function to update task count
    function updateTaskCount() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = remainingTasks;
        cardCount.textContent = activityLog.children.length;

    }

    // ✅ Fix: Clear Activity Log functionality
    clearHistoryBtn.addEventListener("click", () => {
        activityLog.innerHTML = "";
    });

    // Initial Render
    renderTasks();
});
