import host from "../helpers/host";

class Auth {
	constructor() {
		this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
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
		});
	}

	login(data) {
		const url = `${host}/auth/login`;

		return this._fetchPost(url, data)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}

	registration(data) {
		const url = `${host}/auth/registration`;

		return this._fetchPost(url, data)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}
}

export default Auth;