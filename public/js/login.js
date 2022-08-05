import Swal from 'sweetalert2';

document.querySelector("#login").addEventListener("submit", async (event) => {
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

    if (result.success === true) {
        Swal.fire({
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 1500
        })
        window.location.href = `/user.html`;
    } else {
        Swal.fire({
            icon: "error",
            text: result.message
        });
        window.location.reload();
    }
})