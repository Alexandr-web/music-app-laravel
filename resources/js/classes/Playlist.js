import Cookie from "js-cookie";

export default class Playlist {
    constructor() {
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
        this.token = Cookie.get("token") || "";
    }
}