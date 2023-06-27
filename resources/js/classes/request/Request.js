import Cookie from "js-cookie";
import host from "../../helpers/host";

export default class Request {
    constructor() {
        this.HOST = host;
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
        this.TOKEN = Cookie.get("token") || "";
    }

    _getBodyLength(body) {
        if (typeof body === "string") {
            return body.length;
        }

        if (body instanceof FormData) {
            return [...body.keys()].length;
        }

        return Object.keys(body || {}).length;
    }

    send(url, method, options = {}) {
        const incomingHeaders = options.headers || {};
        const body = options.body || {};
        const headers = {
            ...incomingHeaders,
            "Accept-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": this.CSRF_TOKEN,
        };
        const config = { method, headers, };

        if (this._getBodyLength(body)) {
            config.body = body;
        }

        return fetch(url, config)
            .then((data) => data.json())
            .catch((error) => {
                console.error(error);
                return { success: false, message: error.message, error, };
            });
    }
}