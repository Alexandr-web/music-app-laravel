import Alert from "../../classes/ui/Alert";
import User from "../../classes/request/User";
import ValidForm from "../../classes/ui/ValidForm";
import changePasswordState from "../../scripts/changePasswordState";
import uploadFile from "../../scripts/uploadFile";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

export default () => {
	const form = document.querySelector(".form#edit-form");

	if (!form) {
		return;
	}

	const alert = new Alert();

	alert.init();

	const options = {
		avatar: { optional: true, file: true, },
		nickname: { optional: true, min: 3, max: 16, },
		password: { optional: true, min: 9, },
		email: { optional: true, email: true, },
	};

	const callbackWhenAllCompleted = (fd) => {
		const { user_id: id, } = jwtDecode(Cookie.get("token") || "");
		const promiseUpdateUser = new User().updateOne(id, fd);

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