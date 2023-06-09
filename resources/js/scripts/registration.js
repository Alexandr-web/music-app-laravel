import ValidForm from "../helpers/ValidForm";
import Auth from "../classes/Auth";
import Alert from "../classes/Alert";

export default () => {
	const alert = new Alert().init();
	const options = {
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
		email: { email: true, },
	};

	const callbackWhenAllCompleted = () => {
		const data = new FormData(document.querySelector(".form#registration-form"));
		const ext = data.get("avatar").type.match(/\w+$/);

		data.append("fileExt", ext);

		const promiseRegistration = new Auth().registration(data);

		promiseRegistration.then((res) => {
			const { success, message, } = res;

			alert.show(message, success);

			if (success) {
				window.location.href = "/auth/login";
			}
		});
	};

	new ValidForm(".form#registration-form", options, callbackWhenAllCompleted).init();
};