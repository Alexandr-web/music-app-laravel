import ValidForm from "../helpers/ValidForm";
import Auth from "../classes/Auth";
import Cookie from "../helpers/Cookie";
import Alert from "../classes/Alert";

export default () => {
	const alert = new Alert().init();
	const options = {
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
	};

	const callbackWhenAllCompleted = () => {
		const data = new FormData(document.querySelector(".form#login-form"));
		const promiseLogin = new Auth().login(data);

		promiseLogin.then((res) => {
			const { success, message, token, } = res;

			alert.show(message, success);

			if (success) {
				const cookie = new Cookie();

				cookie.add("token", token);
				window.location.href = "/";
			}
		});
	};

	new ValidForm(".form#login-form", options, callbackWhenAllCompleted).init();
};