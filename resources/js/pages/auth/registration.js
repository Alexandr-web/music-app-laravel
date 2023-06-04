import changePasswordState from "../../scripts/changePasswordState";
import uploadFile from "../../scripts/uploadFile";

export default function () {
	if (!document.querySelector(".form#registration-form")) {
		return;
	}

	changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
	uploadFile("#avatar", ".file-upload-area__avatar-img", ".file-upload-area__text", "#file--loader");
}