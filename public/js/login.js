
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

window.onload = () => {
  loginForm();
};
function loginForm() {
  const logIn = document.querySelector("#login");
  if (!logIn) {
    return;
  }
  logIn.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {};
    formData["username"] = form.username.value;
    formData["password"] = form.password.value;
    const resp = await fetch("/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await resp.json();
    console.log(result)
    if (result.success !== false) {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(function(){
        window.location.href = `/user.html`;
      });
    } else {
      Swal.fire({
        icon: "error",
        text: result.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(function(){
        window.location.reload();
      })
    }
  });
}