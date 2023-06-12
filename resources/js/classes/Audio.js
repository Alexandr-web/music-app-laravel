import Request from "./Request";

export default class Audio extends Request {
    add(fd) {
        const url = `${this.HOST}/audio/upload`;
        const options = {
            headers: { "Authorization": `Bearer ${this.TOKEN}`, },
            body: fd,
        };

        return this.send(url, "POST", options);
    }

    getOne(id) {
        const url = `${this.HOST}/api/audio/${id}`;

        return this.send(url, "GET");
    }

    getByName(name) {
        const url = `${this.HOST}/api/audio/?name=${name}`;
        const options = {
            headers: { "Authorization": `Bearer ${this.TOKEN}`, },
        };

        return this.send(url, "GET", options);
    }

    getAll() {
        const url = `${this.HOST}/api/audio`;

        return this.send(url, "GET");
    }
}