document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {
      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed.");
        return;
      }

      // Show success popup
      const popup = document.getElementById("successPopup");
      popup.classList.remove("hidden");
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1500);

    } catch (err) {
      alert("Network error: " + err.message);
    }
  });
});
