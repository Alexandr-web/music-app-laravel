import host from "../helpers/host";
import jwtDecode from "jwt-decode";
import Cookie from "../helpers/Cookie";

export default class User {
    constructor(CSRF_TOKEN) {
        this.CSRF_TOKEN = CSRF_TOKEN;
    }

    getByToken() {
        const token = new Cookie().get("token") || "";
        const data = jwtDecode(token);

        if (data) {
            return this.getOne(data.user_id);
        }

        return null;
    }

    getOne(id) {
        const url = `${host}/api/user/${id}`;
        const request = fetch(url, {
            method: "GET",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
            },
        });

        return request.then((data) => data.json());
    }

    removeOne(id) {
        const token = new Cookie().get("token");
        const url = `${host}/user/delete/${id}`;
        const request = fetch(url, {
            method: "DELETE",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token || ""}`,
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
            },
        });

        return request.then((data) => data.json());
    }

    updateOne(id) {
        const token = new Cookie().get("token");
        const url = `${host}/user/update/${id}`;
        const request = fetch(url, {
            method: "PUT",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token || ""}`,
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
            },
        });

        return request.then((data) => data.json());
    }
}