import changePasswordState from "../../scripts/changePasswordState";
import closeAlert from "../../scripts/closeAlert";

window.addEventListener("load", () => {
	changePasswordState("#password", "#controls-btn-password", "#open-eye-icon", "#closed-eye-icon");
	closeAlert(".alert", ".alert__close");
});