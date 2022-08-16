
import { userFooter } from "./userFooter.js";
import { userNavbar } from "./userNavbar.js";
import { studentSidebar, teacherSidebar } from "./usersInfoPage/usersSidebar.js";

window.onload = () => {
    checkIdentity();
    userNavbar();
    userFooter();

}

async function checkIdentity() {
    const resp = await fetch("/userInfo/checkIdentity", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        if (result.message === "student") {
            studentSidebar();
        } else if (result.message === "teacher") {
            teacherSidebar();
        }
    }
}


