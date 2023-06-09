import Request from "./Request";

export default class Playlist extends Request {
    add(fd) {
        const url = `${this.HOST}/playlist/add`;
        const options = {
            headers: { "Authorization": `Bearer ${this.TOKEN}`, },
            body: fd,
        };

        return this.send(url, "POST", options);
    }

    getOne(id) {
        const url = `${this.HOST}/api/playlist/${id}`;

        return this.send(url, "GET");
    }
}