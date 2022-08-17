import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { navbarCreate } from "./navbar.js";

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
        title: "註冊成功",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = `/html/login.html`;
    } else {
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
      });
      window.location.reload();
    }
  });
}
