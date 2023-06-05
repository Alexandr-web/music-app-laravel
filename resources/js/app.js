import "./bootstrap";
import loginScripts from "./pages/auth/login";
import registrationScripts from "./pages/auth/registration";

window.addEventListener("load", () => {
    loginScripts();
    registrationScripts();

    const meta = document.querySelector("meta[name=csrf-token]");

    fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            "Accept-Type": "application/json",
            "X-CSRF-TOKEN": meta.content,
            "X-Requested-With": "XMLHttpRequest",
        },
    }).then((data) => data.json())
        .then((data) => console.log(data))
        .catch((err) => {
            throw err;
        });
});