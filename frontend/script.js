document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const dashboard = document.getElementById("dashboard");
    const adminPanel = document.getElementById("adminPanel");
    const userPanel = document.getElementById("userPanel");
    const userRoleSpan = document.getElementById("userRole");
    const registerForm = document.getElementById("registerForm");
    const registerContainer = document.getElementById("registerContainer");
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        if (username.startsWith("admin")) {
            userRoleSpan.textContent = "Admin";
            adminPanel.classList.remove("hidden");
            userPanel.classList.add("hidden");
        } else {
            userRoleSpan.textContent = "User";
            userPanel.classList.remove("hidden");
            adminPanel.classList.add("hidden");
        }
        
        document.querySelector(".login-container").classList.add("hidden");
        dashboard.classList.remove("hidden");
    });
    
    document.querySelector("#userPanel button").addEventListener("click", function() {
        const searchQuery = document.querySelector("#userPanel input").value;
        alert("Searching for: " + searchQuery);
    });
    
    document.getElementById("registerButton").addEventListener("click", function() {
        registerContainer.classList.remove("hidden");
    });
    
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const studentName = document.getElementById("studentName").value;
        const studentID = document.getElementById("studentID").value;
        const studentBranch = document.getElementById("studentBranch").value;
        alert("Student Registered: " + studentName + " (" + studentID + ")");
        registerContainer.classList.add("hidden");
    });
});