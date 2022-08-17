
import { checkIfLogIn } from "./navbar.js";

window.onload = () => {
    checkIfLogIn();
    forceLogin();
}

function forceLogin() {
    document.querySelector(".face-time-teaching-btn").addEventListener("click", async() => {
        const result = await checkIfLogIn();
        console.log("this is checkIfLogIn:", result)
        if (result == false) {
            window.location.href = "/html/login.html"
        }else{
            window.location.href="/html/userInfo.html"
        }
    })
}