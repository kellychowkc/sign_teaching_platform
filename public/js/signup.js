import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

window.onload = () => {
  navbarCreate();
  signUpForm();
};

function signUpForm() {
  const signUp = document.querySelector("#signUp");
  if (!signUp) {
    return;
  }
  signUp.addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = {};

    formData["first_name"] = form.firstName.value;
    formData["last_name"] = form.lastName.value;
    formData["username"] = form.username.value;
    formData["password"] = form.password.value;
    formData["confirmPassword"] = form.confirmPassword.value;
    formData["email"] = form.email.value;
    formData["phone_num"] = form.phoneNum.value;
    formData["identity"] = "student";

    console.log(formData);
    if (form.password.value !== form.confirmPassword.value) {
      Swal.fire({
        icon: "error",
        text: "請再次確認您的密碼",
      });
      return;
    }

    const resp = await fetch("/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await resp.json();
    if (result.success === true) {
      Swal.fire({
        icon: "success",
        title: result.message,
        text: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = `http://localhost:8080/html/login.html`;
    } else {
      Swal.fire({
        icon: "error",
        text: result.message,
      });
      window.location.reload();
    }
  });
}

export function navbarCreate() {
  document.querySelector("#header").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
  <div class="container">
      <a href="../index.html"><img src="../assets/手語學堂logo.png" alt="logo" id="logo" width="100" height="90"></a>
    
                          
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
       </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">

              <li class="nav-item">
                  <a class="nav-link" href="../index.html">手語簡介</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="./teacherIntro.html">導師簡介</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="./signTeaching.html">手語入門</a>
              </li>
              <li class="nav-item" id="signIn-box">
                  <a class="nav-link" href="./login.html">登入
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5D281D" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                      <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                  </a>
              </li>
      </div>
  </div>
</nav>
    `;
}
