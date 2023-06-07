import changePasswordState from "../../scripts/changePasswordState";
import uploadFile from "../../scripts/uploadFile";
import closeAlert from "../../scripts/closeAlert";
import registration from "../../scripts/registration";

window.addEventListener("load", () => {
	changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
	uploadFile(
		"#avatar", ".file-upload-area__avatar-img",
		".file-upload-area__text", "#file--loader"
	);
	closeAlert(".alert", ".alert__close");
	registration();
});