import Swal from "sweetalert2";
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
    formData["username"] = form.loginUsername.value;
    formData["password"] = form.loginPassword.value;
    const resp = await fetch("/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await resp.json();
    if (result.success === true && result.identity === "student") {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = `/user.html`;
    } else if(result.success === true && result.identity === "teacher"){
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = `/teacher.html`;
    } else if(result.success === true && result.identity === "admin"){
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("this is admin!")
      window.location.href = `/admin.html`;
    }else {
      Swal.fire({
        icon: "error",
        text: result.message,
      });
      window.location.reload();
    }
  });
}