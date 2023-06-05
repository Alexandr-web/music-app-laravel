import ValidForm from "../helpers/ValidForm";
import getDataFromForm from "../helpers/getDataFromForm";
import Auth from "../classes/Auth";
import setCookie from "../helpers/setCookie";

export default function () {
	const options = {
		"nickname": { min: 3, max: 16, },
		"password": { min: 9, },
	};
	const callbackWhenAllCompleted = (e) => {
		const data = getDataFromForm(e);
		const CSRF_TOKEN = document.querySelector("meta[name='csrf-token']").content;

		const promiseLogin = new Auth().login(data, CSRF_TOKEN);

		promiseLogin.then((res) => {
			const { success, message, userId, } = res;

			if (message) {
				const alert = document.querySelector(".alert");
				const alertText = alert.querySelector(".alert__text");
				const icon = alert.querySelector(`.alert__icon--${success ? "success" : "error"}`);

				alert.className = `alert alert--${success ? "success" : "error"}`;
				icon.classList.remove("hide");
				alertText.textContent = message;
			}

			if (success) {
				setCookie("userId", userId);
			}
		});
	};

	new ValidForm(".form#login-form", options, callbackWhenAllCompleted).init();
}