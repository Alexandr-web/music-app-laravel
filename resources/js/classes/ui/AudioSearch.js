import Audio from "../request/Audio";
import getHTMLStringAudioBlock from "../../helpers/getHTMLStringAudioBlock";

export default class AudioSearch {
    constructor() {
        this.searchAudioResultList = document.querySelector("#search-audio-result-list");
        this.addedAudioList = document.querySelector("#added-audio-list");
        this.input = document.querySelector(".form__input#audio");
        this.nothingElementInSearchResult = document.querySelector("#search-nothing");
        this.nothingElementInAddedList = document.querySelector("#added-nothing");
        this.addedAudiosId = [];
    }

    _displayResult(audio) {
        const strHTMLAudio = getHTMLStringAudioBlock(audio, "add-audio-to-playlist", true, !this.addedAudiosId.includes(audio.id));

        this.searchAudioResultList.innerHTML += `<li class="form__search-result-item">${strHTMLAudio}</li>`;
    }

    _addAudio(id) {
        const findIdxAudio = this.addedAudiosId.indexOf(id);

        if (findIdxAudio !== -1) {
            this.addedAudiosId.splice(findIdxAudio, 1);
        } else {
            this.addedAudiosId.push(id);
        }

        this._changeStateNothingElement(this.addedAudiosId, this.nothingElementInAddedList);
    }

    _removeAudio(id) {
        const findIdxAudio = this.addedAudiosId.indexOf(id);

        if (findIdxAudio !== -1) {
            this.addedAudiosId.splice(findIdxAudio, 1);
        }

        this._changeStateNothingElement(this.addedAudiosId, this.nothingElementInAddedList);
    }

    _changeStateNothingElement(list, element) {
        if (!list.length) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }
    }

    _setRemoveAtAddedAudio() {
        const audio = this.addedAudioList.querySelectorAll(".form__search-result-item .audio");

        audio.forEach((audioEl) => {
            const audioId = parseInt(audioEl.dataset.audioId);
            const btnRemove = audioEl.querySelector(".audio__add-btn");

            btnRemove.addEventListener("click", () => {
                this._removeAudio(audioId);
                this._removeChildAtAddedAudioList(audioId);
                this._changeViewIconsPlusAndCross(false, audioId);
            });
        });
    }

    _removeChildAtAddedAudioList(audioId) {
        const audioElement = this.addedAudioList.querySelector(`.audio[data-audio-id="${audioId}"]`);
        const parentAudioElement = audioElement.closest(".form__search-result-item");

        this.addedAudioList.removeChild(parentAudioElement);
    }

    _changeViewIconsPlusAndCross(audioIsAdded, audioId) {
        const crossIcon = document.querySelector(`.audio[data-audio-id="${audioId}"] .cross-icon`);
        const plusIcon = document.querySelector(`.audio[data-audio-id="${audioId}"] .plus-icon`);

        if (audioIsAdded) {
            crossIcon.classList.remove("hide");
            plusIcon.classList.add("hide");
        } else {
            plusIcon.classList.remove("hide");
            crossIcon.classList.add("hide");
        }
    }

    _setAddAudio() {
        const audio = this.searchAudioResultList.querySelectorAll(".form__search-result-item .audio");

        audio.forEach((audioEl) => {
            const audioId = parseInt(audioEl.dataset.audioId);
            const btnAdd = audioEl.querySelector(".audio__add-btn");

            btnAdd.addEventListener("click", () => {
                this._addAudio(audioId);
                this._displayAddedAudio(audioId);
                this._changeViewIconsPlusAndCross(this.addedAudiosId.includes(audioId), audioId);
            });
        });
    }

    _displayAddedAudio(audioId) {
        if (!this.addedAudiosId.includes(audioId)) {
            this._removeChildAtAddedAudioList(audioId);

            return;
        }

        new Audio().getOne(audioId).then(({ success, audio, }) => {
            if (!success) {
                return;
            }

            const strHTMLAudio = getHTMLStringAudioBlock(audio, "add-audio-to-playlist", true, false);

            this.nothingElementInAddedList.classList.add("hide");
            this.addedAudioList.innerHTML += `<li class="form__search-result-item">${strHTMLAudio}</li>`;

            this._setRemoveAtAddedAudio();
        }).catch((err) => {
            throw err;
        });
    }

    search() {
        this.input.addEventListener("input", () => {
            const val = this.input.value.trim();

            this.searchAudioResultList.innerHTML = "";
            this.nothingElementInSearchResult.classList.remove("hide");

            if (val.length >= 3) {
                setTimeout(() => {
                    new Audio().getByName(val)
                        .then(({ audio, success, }) => {
                            if (!success) {
                                return;
                            }

                            this._changeStateNothingElement(audio, this.nothingElementInSearchResult);

                            audio.forEach((audioData) => this._displayResult(audioData));

                            this._setAddAudio();
                        }).catch((err) => {
                            throw err;
                        });
                }, 500);
            }
        });

        return this;
    }
}