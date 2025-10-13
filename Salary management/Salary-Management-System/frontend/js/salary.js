// salary.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Salary Module Loaded 💵");

  const salaryForm = document.getElementById("salaryForm");

  if (salaryForm) {
    salaryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(salaryForm);
      fetch("save_salary.php", {
        method: "POST",
        body: formData,
      })
        .then(res => {
          if (!res.ok) throw new Error("Network error");
          return res.text();
        })
        .then(() => {
          alert("Salary saved successfully!");
          salaryForm.reset();
        })
        .catch(err => {
          console.error("Error saving salary:", err);
          alert("Failed to save salary. Try again.");
        });
    });
  }
});

