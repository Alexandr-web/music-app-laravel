import ValidForm from "../helpers/ValidForm";
import Auth from "../classes/Auth";
import getDataFromForm from "../helpers/getDataFromForm";
import initAlert from "../helpers/initAlert";

export default function () {
	const options = {
		"nickname": { min: 3, max: 16, },
		"password": { min: 9, },
		"email": { email: true, },
	};

	const callbackWhenAllCompleted = (e) => {
		const data = getDataFromForm(
			document.querySelector(".form#registration-form")
		);
		const CSRF_TOKEN = document.querySelector("meta[name='csrf-token']").content;
		const promiseRegistration = new Auth(CSRF_TOKEN).registration(data);

		promiseRegistration.then((res) => {
			const { success, message, } = res;

			if (message) initAlert(success, message);
			if (success) window.location.href = "/auth/login";
		});
	};

	new ValidForm(".form#registration-form", options, callbackWhenAllCompleted).init();
}