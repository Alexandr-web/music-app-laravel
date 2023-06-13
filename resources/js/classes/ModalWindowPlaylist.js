import getHTMLStringAudioBlock from "../helpers/getHTMLStringAudioBlock";
import Audio from "./Audio";
import host from "../helpers/host";

export default class ModalWindowPlaylist {
    constructor(playlistId, audioId) {
        this.modalWindow = document.querySelector(".modal-window-playlist");
        this.poster = document.querySelector(".modal-window-playlist__poster-image");
        this.name = document.querySelector(".modal-window-playlist__name");
        this.linkChange = document.querySelector(".modal-window-playlist__link");
        this.btnRemove = document.querySelector(".modal-window-playlist__btn-remove");
        this.audioList = document.querySelector(".modal-window-playlist__audio-list");

        this.playlistId = playlistId;
        this.audioId = audioId;
        this.urlStoragePosters = `${host}/storage/posters`;
    }

    _show() {
        this.modalWindow.classList.remove("hide");
    }

    _hide() {
        this.modalWindow.classList.add("hide");

        this.poster.src = "";
        this.name.textContent = "";
        this.linkChange.href = "";
        this.audioList.innerHTML = "";
    }

    _getAllAudio() {
        const promises = this.audioId.map((id) => new Audio().getOne(id));

        return Promise.all(promises);
    }

    _addToAudioList(audio) {
        const audioStr = getHTMLStringAudioBlock(audio, true, false);

        this.audioList.innerHTML += `<li class="modal-window-playlist__audio-item">${audioStr}</li>`;
    }

    setData(poster, name, playlistId) {
        this.poster.src = `${this.urlStoragePosters}/${poster}`;
        this.name.textContent = name;
        this.linkChange.href = `/playlist/${playlistId}/edit`;

        this._getAllAudio()
            .then((audioArray) => {
                audioArray.map(({ success, audio, }) => {
                    if (!success) {
                        return;
                    }

                    this._addToAudioList(audio);
                });
            }).then(() => this._show()).catch((err) => {
                throw err;
            });
    }

    _setClose() {
        this.modalWindow.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal-window-playlist")) {
                this._hide();
            }
        });
    }

    init() {
        this._setClose();

        return this;
    }
}