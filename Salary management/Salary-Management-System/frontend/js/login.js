// login.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Login Page Ready 🔐");

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      const formData = new FormData(loginForm);
      const username = formData.get("username");

      fetch("login.php", {
        method: "POST",
        body: formData,
      })
        .then(res => {
          if (res.redirected) {
            // Login successful → redirect to dashboard
            localStorage.setItem("username", username);
            window.location.href = res.url;
          } else {
            return res.text();
          }
        })
        .then(data => {
          if (data && !data.includes("dashboard")) {
            document.getElementById("loginError").innerHTML =
              "<p style='color:red;'>" + data + "</p>";
          }
        })
        .catch(err => {
          console.error("Login failed:", err);
          document.getElementById("loginError").innerHTML =
            "<p style='color:red;'>Error connecting to server.</p>";
        });
    });
  }
});
