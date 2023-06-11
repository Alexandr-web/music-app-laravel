import host from "../helpers/host";
import Cookie from "../helpers/Cookie";

export default class Audio {
    constructor() {
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
        this.token = new Cookie().get("token");
    }

    add(fd) {
        const url = `${host}/audio/upload`;
        const res = fetch(url, {
            method: "POST",
            headers: {
                "Accept-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
                "Authorization": `Bearer ${this.token}`,
            },
            body: fd,
        });

        return res.then((data) => data.json());
    }

    getOne(id) {
        const url = `${host}/api/audio/${id}`;
        const res = fetch(url, {
            method: "GET",
            headers: {
                "Accept-Type": "application/json",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        return res.then((data) => data.json());
    }

    getByName(name) {
        const url = `${host}/api/audio/?name=${name}`;
        const res = fetch(url, {
            method: "GET",
            headers: {
                "Accept-Type": "application/json",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${this.token}`,
            },
        });

        return res.then((data) => data.json());
    }

    getAll() {
        const url = `${host}/api/audio`;
        const res = fetch(url, {
            method: "GET",
            headers: {
                "Accept-Type": "application/json",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        return res.then((data) => data.json());
    }
}