import changePasswordState from "../../scripts/changePasswordState";

export default function () {
    if (!document.querySelector(".form#registration-form")) {
        return;
    }

    changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
}