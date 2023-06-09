import host from "../helpers/host";

export default class Audio {
    constructor(CSRF_TOKEN) {
        this.CSRF_TOKEN = CSRF_TOKEN;
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