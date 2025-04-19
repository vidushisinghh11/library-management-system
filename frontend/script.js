document.addEventListener("DOMContentLoaded", () => {
    // Setup login handlers
    setupLogin("adminLoginForm", true);
    setupLogin("loginForm", false);
  });
  
  // Generic login function
  function setupLogin(formId, isAdmin) {
    const form = document.getElementById(formId);
    if (!form) return;
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = form.querySelector('input[type="text"]').value;
      const password = form.querySelector('input[type="password"]').value;
  
      const payload = {
        userID: email,
        password: password,
        isAdmin: isAdmin
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(data.error || "Login failed");
          return;
        }
  
        alert("Login successful!");
  
        // Redirect based on user type
        if (isAdmin) {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user-dashboard.html"; // You can create this next
        }
      } catch (error) {
        alert("Error during login: " + error.message);
      }
    });
  }
  