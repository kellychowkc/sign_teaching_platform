
import { navbarCreate, footerCreate, checkIfLogIn } from "./navbar.js";

console.log("teacherIntro.js")
window.onload = () => {
    navbarCreate();
    footerCreate();
    checkIfLogIn();
};
