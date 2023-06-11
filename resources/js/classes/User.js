import host from "../helpers/host";
import jwtDecode from "jwt-decode";
import Cookie from "../helpers/Cookie";

export default class User {
	constructor() {
		this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
		this.TOKEN = new Cookie().get("token") || "";
	}

	_fetch(url, method, options = { body: {}, headers: {}, }) {
		const allHeaders = Object.assign(options.headers, {
			"Accept-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-TOKEN": this.CSRF_TOKEN,
		});

		const config = { method, headers: allHeaders, };

		if (
			Object.keys(options.body).length ||
			(options.body instanceof FormData && Array.from(options.body.keys()).length)
		) {
			config["body"] = options.body;
		}

		return fetch(url, config)
			.then((data) => data.json())
			.catch((error) => {
				console.error(error);
				return { success: false, message: error.message, error, };
			});
	}

	setDataInCookie() {
		const cookie = new Cookie();
		const res = this.getByToken();

		if (res) {
			res.then(({ success, user, }) => {
				if (success) {
					cookie.add("currentUser", user, true);
				}
			}).catch((err) => {
				throw err;
			});
		}
	}

	getByToken() {
		const data = jwtDecode(this.TOKEN);

		if (data) {
			return this.getOne(data.user_id);
		}

		return null;
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
			"DELETE",
			{
				headers: { "Authorization": `Bearer ${this.TOKEN || ""}`, },
			}
		);
	}

	updateOne(id, fd) {
		return this._fetch(
			`${host}/user/update/${id}`,
			"POST",
			{
				headers: { "Authorization": `Bearer ${this.TOKEN || ""}`, },
				body: fd,
			}
		);
	}
}