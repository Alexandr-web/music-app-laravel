import host from "../helpers/host";

export default class User {
    constructor(CSRF_TOKEN) {
        this.CSRF_TOKEN = CSRF_TOKEN;
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
        const url = `${host}/user/delete/${id}`;
        const request = fetch(url, {
            method: "DELETE",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
            },
        });

        return request.then((data) => data.json());
    }

    updateOne(id) {
        const url = `${host}/user/update/${id}`;
        const request = fetch(url, {
            method: "PUT",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
            },
        });

        return request.then((data) => data.json());
    }
}