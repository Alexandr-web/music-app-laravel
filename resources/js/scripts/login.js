import ValidForm from "../helpers/ValidForm";
import getDataFromForm from "../helpers/getDataFromForm";
import Auth from "../classes/Auth";
import setCookie from "../helpers/setCookie";
import initAlert from "../helpers/initAlert";

export default function () {
	const options = {
		"nickname": { min: 3, max: 16, },
		"password": { min: 9, },
	};
	const callbackWhenAllCompleted = (e) => {
		const data = getDataFromForm(
			document.querySelector(".form#login-form")
		);
		const CSRF_TOKEN = document.querySelector("meta[name='csrf-token']").content;

		const promiseLogin = new Auth(CSRF_TOKEN).login(data);

		promiseLogin.then((res) => {
			const { success, message, token, } = res;

			if (message) initAlert(success, message);
			if (success) {
				setCookie("token", token);
				window.location.href = "/";
			}
		});
	};

	new ValidForm(".form#login-form", options, callbackWhenAllCompleted).init();
}