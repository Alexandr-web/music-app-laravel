import Request from "./Request";

class Auth extends Request {
	login(data) {
		const url = `${this.HOST}/auth/login`;
		const options = {
			body: data,
		};

		return this.send(url, "POST", options);
	}

	registration(data) {
		const url = `${this.HOST}/auth/registration`;
		const options = {
			body: data,
		};

		return this.send(url, "POST", options);
	}
}

export default Auth;