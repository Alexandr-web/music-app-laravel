import changePasswordState from "../../scripts/changePasswordState";
import closeAlert from "../../scripts/closeAlert";
import login from "../../scripts/login";

export default function () {
	if (!document.querySelector(".form#login-form")) {
		return;
	}

	changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
	closeAlert(".alert", ".alert__close");
	login();
}