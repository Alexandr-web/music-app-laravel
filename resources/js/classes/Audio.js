import host from "../helpers/host";

export default class Audio {
    constructor() {
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
    }

    getOne(id) {
        const url = `${host}/api/audio/${id}`;
        const res = fetch(url, {
            "Accept-Type": "application/json",
            "X-CSRF-TOKEN": this.CSRF_TOKEN,
            "X-Requested-With": "XMLHttpRequest",
        });

        return res.then((data) => data.json());
    }

    getAll() {
        const url = `${host}/api/audio`;
        const res = fetch(url, {
            "Accept-Type": "application/json",
            "X-CSRF-TOKEN": this.CSRF_TOKEN,
            "X-Requested-With": "XMLHttpRequest",
        });

        return res.then((data) => data.json());
    }
}