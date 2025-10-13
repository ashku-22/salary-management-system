document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeId = form.employeeId.value;
    const payload = {
      name: sanitize(form.name.value),
      email: sanitize(form.email.value),
      department: sanitize(form.department.value),
      designation: sanitize(form.designation.value),
      phone: sanitize(form.phone.value),
    };

    if (!payload.name || !payload.email) {
      alert("Name and Email are required.");
      return;
    }

    const url = employeeId ? `/api/employees/${employeeId}` : `/api/employees`;
    const method = employeeId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Employee saved successfully!");
        form.reset();
      } else {
        alert("Failed to save employee");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  });
});

function sanitize(input) {
  return input.replace(/[<>]/g, "").trim();
}
