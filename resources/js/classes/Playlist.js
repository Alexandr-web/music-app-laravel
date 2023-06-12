import host from "../helpers/host";
import Cookie from "js-cookie";

export default class Playlist {
    constructor() {
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
        this.token = Cookie.get("token") || "";
    }

    add(fd) {
        const url = `${host}/playlist/add`;
        const res = fetch(url, {
            method: "POST",
            headers: {
                "Accept-Type": "application/json",
                "X-CSRF-TOKEN": this.CSRF_TOKEN,
                "Authorization": `Bearer ${this.token}`,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: fd,
        });

        return res.then((data) => data.json());
    }
}