import Swal from "sweetalert2";

window.onload = () => {
  signUpForm();
};

function signUpForm() {
  const signUp = document.querySelector("#signup");
  if (!signUp) {
    return;
  }
  signUp.addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = {};

    formData["firstName"] = form.firstName.value;
    formData["lastName"] = form.lastName.value;
    formData["username"] = form.username.value;
    formData["password"] = form.password.value;
    formData["confirmPassword"] = form.confirmPassword.value;
    formData["email"] = form.email.value;
    formData["phoneNum"] = form.phoneNum.value;

    if (password !== confirmPassword) {
      alert("Please Confirm Your Password Again");
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
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = `/login.html`;
    } else {
      Swal.fire({
        icon: "error",
        text: result.message,
      });
      window.location.reload();
    }
  });
}
