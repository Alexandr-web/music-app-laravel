import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import Request from "./Request";

export default class User extends Request {
	setDataInCookie() {
		const res = this.getByToken();

		if (res) {
			res.then(({ success, user, }) => {
				if (success) {
					Cookie.set("currentUser", JSON.stringify(user));
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
		const url = `${this.HOST}/api/user/${id}`;

		return this.send(url, "GET");
	}

	removeOne(id) {
		const url = `${this.HOST}/user/delete/${id}`;
		const options = {
			headers: { "Authorization": `Bearer ${this.TOKEN}`, },
		};

		return this.send(url, "DELETE", options);
	}

	updateOne(id, fd) {
		const url = `${this.HOST}/user/update/${id}`;
		const options = {
			headers: { "Authorization": `Bearer ${this.TOKEN}`, },
			body: fd,
		};

		return this.send(url, "POST", options);
	}
}