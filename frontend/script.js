document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  const popup = document.getElementById("successPopup");

  if (!form || !popup) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    try {
      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        popup.textContent = data.error || "Login failed.";
        popup.style.backgroundColor = "#f8d7da"; // red background for error
        popup.style.color = "#721c24";
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 2500);
        return;
      }

      // Show success popup
      popup.textContent = "✅ Login successful! Redirecting...";
      popup.style.backgroundColor = "#e6fff1";
      popup.style.color = "#2c7a4b";
      popup.classList.remove("hidden");

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);

    } catch (err) {
      popup.textContent = "⚠️ Network error: " + err.message;
      popup.style.backgroundColor = "#f8d7da";
      popup.style.color = "#721c24";
      popup.classList.remove("hidden");
      setTimeout(() => popup.classList.add("hidden"), 3000);
    }
  });
});
