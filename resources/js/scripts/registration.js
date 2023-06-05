import ValidForm from "../helpers/ValidForm";

export default function () {
	const options = {
		"avatar": { file: true, },
		"nickname": { min: 3, max: 16, },
		"password": { min: 9, },
		"email": { email: true, },
	};
	const callbackWhenAllCompleted = (e) => {
		console.log(e);
	};

	new ValidForm(".form#registration-form", options, callbackWhenAllCompleted).init();
}