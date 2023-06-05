class Auth {
	constructor() {
		this._HOST = "http://127.0.0.1:8000";
	}

	login(data, CSRF_TOKEN) {
		const url = `${this._HOST}/auth/login`;

		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-TOKEN": CSRF_TOKEN,
				"X-Requested-With": "XMLHttpRequest",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((res) => {
				const { success, message, } = res;
				return { success, message, };
			})
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}
}

export default Auth;