document.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.getElementById("dashboard");

  dashboardContainer.innerHTML = `
    <h2>Welcome to Dashboard</h2>
    <nav>
      <ul>
        <li><a href="employee.html">Manage Employees</a></li>
        <li><a href="salary.html">View Salaries</a></li>
        <li><a href="login.html" onclick="logout()">Logout</a></li>
      </ul>
    </nav>
  `;
});

function logout() {
  localStorage.removeItem("token");
  alert("Logged out");
}
