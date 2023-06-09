import host from "../helpers/host";

class Auth {
	constructor(CSRF_TOKEN) {
		this.CSRF_TOKEN = CSRF_TOKEN;
	}

	_fetchPost(url, data, headers = {}) {
		const allHeaders = Object.assign(headers, {
			"X-CSRF-TOKEN": this.CSRF_TOKEN,
			"X-Requested-With": "XMLHttpRequest",
		});

		return fetch(url, {
			method: "POST",
			headers: allHeaders,
			body: data,
		})
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

	login(data) {
		return this._fetchPost(
			`${host}/auth/login`,
			data
		);
	}

	registration(data) {
		return this._fetchPost(
			`${host}/auth/registration`,
			data
		);
	}
}

export default Auth;