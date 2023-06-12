import ValidForm from "../../helpers/ValidForm";
import Auth from "../../classes/Auth";
import Alert from "../../classes/Alert";
import Cookie from "js-cookie";

window.addEventListener("load", () => {
	const alert = new Alert().init();
	const options = {
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
	};

	const callbackWhenAllCompleted = (fd) => {
		const promiseLogin = new Auth().login(fd);

		promiseLogin.then((res) => {
			const { success, message, token, } = res;

			alert.show(message, success);

			if (success) {
				Cookie.set("token", token);
				window.location.href = "/";
			}
		});
	};

	new ValidForm(".form#login-form", options, callbackWhenAllCompleted).init();
});