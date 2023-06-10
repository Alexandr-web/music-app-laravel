import changePasswordState from "../../scripts/changePasswordState";

window.addEventListener("load", () => {
    changePasswordState("#password", "#controls-btn-password", "#open-eye-icon", "#closed-eye-icon");
});