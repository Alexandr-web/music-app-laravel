import host from "../helpers/host";
import Cookie from "../helpers/Cookie";

export default class Playlist {
    constructor() {
        this.CSRF_TOKEN = document.querySelector("meta[name=csrf-token]").content;
        this.token = new Cookie().get("token");
    }
}