import changePasswordState from "../../scripts/changePasswordState";
import uploadAvatar from "../../scripts/uploadAvatar";

export default function () {
	if (!document.querySelector(".form#registration-form")) {
		return;
	}

	changePasswordState("#password", "#controls-btn-password", "#controls-btn-password #open-eye-icon", "#controls-btn-password #closed-eye-icon");
	uploadAvatar("#avatar", ".file-upload-area__avatar-img", ".file-upload-area__text", ".avatar--loader");
}