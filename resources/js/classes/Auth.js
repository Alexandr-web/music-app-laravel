class Auth {
	constructor(CSRF_TOKEN) {
		this.CSRF_TOKEN = CSRF_TOKEN;

		this._HOST = "http://127.0.0.1:8000";
	}

	_fetchPost(url, data, headers = {}) {
		const allHeaders = Object.assign(headers, {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": this.CSRF_TOKEN,
			"X-Requested-With": "XMLHttpRequest",
		});

		return fetch(url, {
			method: "POST",
			headers: allHeaders,
			body: JSON.stringify(data),
		});
	}

	login(data) {
		const url = `${this._HOST}/auth/login`;

		return this._fetchPost(url, data)
			.then((response) => response.json())
			.then((res) => {
				const { success, message, token, } = res;
				return { success, message, token, };
			})
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}

	registration(data) {
		const url = `${this._HOST}/auth/registration`;

		return this._fetchPost(url, data)
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