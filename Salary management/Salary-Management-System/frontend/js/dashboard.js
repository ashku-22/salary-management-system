// dashboard.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard loaded ✅");

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "logout.php";
      }
    });
  }

  // Optionally, display welcome message dynamically
  const userName = localStorage.getItem("username");
  if (userName) {
    const userEl = document.getElementById("welcomeUser");
    if (userEl) userEl.textContent = `Welcome, ${userName}!`;
  }

  // Chart setup is handled in chart-setup.js
});


