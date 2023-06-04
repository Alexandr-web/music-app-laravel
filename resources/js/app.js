import "./bootstrap";
import loginScripts from "./pages/auth/login";
import registrationScripts from "./pages/auth/registration";

window.addEventListener("load", () => {
    loginScripts();
    registrationScripts();
});