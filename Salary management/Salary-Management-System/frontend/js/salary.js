document.addEventListener("DOMContentLoaded", () => {
  loadSalaryData();
});

async function loadSalaryData() {
  const tableBody = document.querySelector("#salaryTable tbody");

  try {
    const res = await fetch("/api/salaries");
    const data = await res.json();

    tableBody.innerHTML = "";

    data.forEach((item) => {
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.amount}</td>
          <td>${item.date}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error(err);
    alert("Could not fetch salary data.");
  }
}
