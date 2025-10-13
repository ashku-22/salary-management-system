// employee.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Employee Module Active 🧑‍💼");

  // Fetch user details from backend (future expansion)
  fetch("get_user_info.php")
    .then(res => res.json())
    .then(data => {
      const empDiv = document.getElementById("employeeDetails");
      if (data && empDiv) {
        empDiv.innerHTML = `
          <h3>Employee Details</h3>
          <p><b>Name:</b> ${data.username}</p>
          <p><b>Joined On:</b> ${data.join_date || "N/A"}</p>
        `;
      }
    })
    .catch(err => console.error("Failed to load employee info:", err));
});
