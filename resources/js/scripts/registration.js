import ValidForm from "../helpers/ValidForm";
import Auth from "../classes/Auth";
import Alert from "../classes/Alert";

export default () => {
	const alert = new Alert().init();
	const options = {
		avatar: { optional: true, file: true, },
		nickname: { min: 3, max: 16, },
		password: { min: 9, },
		email: { email: true, },
	};

	const callbackWhenAllCompleted = (fd) => {
		const ext = fd.get("avatar").type.match(/\w+$/);

		fd.append("fileExt", ext);

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
};