import host from "../helpers/host";

class Auth {
	constructor() {
		this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
	}

	_fetchPost(url, data, headers = {}) {
		const allHeaders = Object.assign(headers, {
			"X-CSRF-TOKEN": this.CSRF_TOKEN,
			"X-Requested-With": "XMLHttpRequest",
			"Accept-Type": "application/json",
		});

		return fetch(url, {
			method: "POST",
			headers: allHeaders,
			body: data,
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}

	login(data) {
		return this._fetchPost(`${host}/auth/login`, data);
	}

	registration(data) {
		return this._fetchPost(`${host}/auth/registration`, data);
	}
}

export default Auth;