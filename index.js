document.addEventListener("DOMContentLoaded", () => {
    const activityLog = document.getElementById("activity-log");
    const taskCount = document.getElementById("task-count");
    const logCount = document.getElementById("log-count");
    const currentDateElement = document.getElementById("current-date");

    // Set current date in task cards and navbar
    const currentDate = new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'long', year: 'numeric' });
    document.querySelectorAll(".current-date").forEach(span => {
        span.textContent = currentDate;
    });
    currentDateElement.textContent = currentDate;
    
    document.querySelectorAll(".complete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const taskCard = event.target.closest("div[data-task]");
            const taskName = taskCard.getAttribute("data-task");
            
            // Disable button
            event.target.disabled = true;
            event.target.classList.add("bg-gray-400", "cursor-not-allowed");
            event.target.textContent = "Completed";
            
            // Add to Activity Log
            const logEntry = document.createElement("li");
            logEntry.textContent = `Task Completed: ${taskName} at ${new Date().toLocaleTimeString()}`;
            activityLog.appendChild(logEntry);
            
            // Update task and log counts
            taskCount.textContent = document.querySelectorAll(".complete-btn:not([disabled])").length;
        });
    });
});