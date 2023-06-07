import changePasswordState from "../../scripts/changePasswordState";
import closeAlert from "../../scripts/closeAlert";
import login from "../../scripts/login";

window.addEventListener("load", () => {
	changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
	closeAlert(".alert", ".alert__close");
	login();
});