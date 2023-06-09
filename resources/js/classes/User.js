import host from "../helpers/host";

export default class User {
	constructor(CSRF_TOKEN) {
		this.CSRF_TOKEN = CSRF_TOKEN;
	}

	_fetch(url, method, options = { body: {}, headers: {}, }) {
		const allHeaders = Object.assign(options.headers, {
			"Accept-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-TOKEN": this.CSRF_TOKEN,
		});

		const config = {
			method, headers: allHeaders,
		};

		if (Object.keys(options.body).length) {
			config["body"] = options.body;
		}

		const request = fetch(url, config);

		return request.then((data) => data.json());
	}

	getOne(id) {
		return this._fetch(
			`${host}/api/user/${id}`,
			"GET"
		);
	}

	removeOne(id) {
		return this._fetch(
			`${host}/user/delete/${id}`,
			"DELETE"
		);
	}

	updateOne(id, data) {
		const options = {
			body: data,
			headers: { "Content-Type": "application/json", },
		};

		return this._fetch(
			`${host}/user/update/${id}`,
			"PUT",
			options
		);
	}
}