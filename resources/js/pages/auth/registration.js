import uploadFile from "../../scripts/uploadFile";
import ValidForm from "../../classes/ValidForm";
import Auth from "../../classes/Auth";
import Alert from "../../classes/Alert";

window.addEventListener("load", () => {
	const alert = new Alert().init();
	const options = {
		avatar: { optional: true, file: true, },
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
		email: { email: true, },
	};

	const callbackWhenAllCompleted = (fd) => {
		const promiseRegistration = new Auth().registration(fd);

		promiseRegistration.then((res) => {
			const { success, message, } = res;

			alert.show(message, success);

			if (success) {
				window.location.href = "/auth/login";
			}
		});
	};

	new ValidForm(".form#registration-form", options, callbackWhenAllCompleted).init();

	uploadFile("#avatar", ".file-upload-area__text", ".loader", (file, result) => {
		const image = document.querySelector(".file-upload-area__avatar-img");

		image.src = result;
		image.classList.remove("hide");
	});
});