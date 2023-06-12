import Alert from "../../classes/Alert";
import User from "../../classes/User";
import ValidForm from "../../helpers/ValidForm";
import changePasswordState from "../../scripts/changePasswordState";
import uploadFile from "../../scripts/uploadFile";
import Cookie from "js-cookie";

export default () => {
	const form = document.querySelector(".form#edit-form");
	const alert = new Alert();

	alert.init();

	if (!form) {
		return;
	}

	const options = {
		avatar: { optional: true, file: true, },
		nickname: { optional: true, min: 3, max: 16, },
		password: { optional: true, min: 9, },
		email: { optional: true, email: true, },
	};

	const callbackWhenAllCompleted = (fd) => {
		const { id: userId, } = JSON.parse(Cookie.get("currentUser") || "");
		const promiseUpdateUser = new User().updateOne(userId, fd);

		promiseUpdateUser
			.then(({ success, message, }) => {
				alert.show(message, success);
			});
	};

	new ValidForm(".form#edit-form", options, callbackWhenAllCompleted).init();

	changePasswordState("#password", "#controls-btn-password", "#open-eye-icon", "#closed-eye-icon");
	uploadFile("#avatar", ".file-upload-area__text", ".loader", (file, result) => {
		const image = document.querySelector(".file-upload-area__avatar-img");

		image.src = result;
		image.classList.remove("hide");
	});
};