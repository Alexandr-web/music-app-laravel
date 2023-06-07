import ValidForm from "../helpers/ValidForm";
import Auth from "../classes/Auth";
import initAlert from "../helpers/initAlert";

export default () => {
	const options = {
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
		email: { email: true, },
	};

	const callbackWhenAllCompleted = () => {
		const data = new FormData(document.querySelector(".form#registration-form"));
		const ext = data.get("avatar").type.match(/\w+$/);

		data.append("fileExt", ext);

		const CSRF_TOKEN = document.querySelector("meta[name='csrf-token']").content;
		const promiseRegistration = new Auth(CSRF_TOKEN).registration(data);

		promiseRegistration.then((res) => {
			const { success, message, } = res;

			if (message) initAlert(success, message);
			if (success) window.location.href = "/auth/login";
		});
	};

	new ValidForm(".form#registration-form", options, callbackWhenAllCompleted).init();
};