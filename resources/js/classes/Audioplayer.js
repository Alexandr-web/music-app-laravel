import host from "../helpers/host";
import convertToCorrectTime from "../helpers/convertToCorrectTime";
import CustomRange from "./CustomRange";

export default class Audioplayer {
    constructor() {
        this.elAudioplayer = document.querySelector(".audio-player");
        this.elPlayBtn = document.querySelector("#audio-play-btn");
        this.elPrevBtn = document.querySelector("#audio-prev-btn");
        this.elNextBtn = document.querySelector("#audio-next-btn");
        this.elPoster = document.querySelector(".audio-player__poster-image");
        this.elPosterWrapper = document.querySelector(".audio-player__poster");
        this.elAudioName = document.querySelector(".audio-player__song-name");
        this.elAudioSinger = document.querySelector(".audio-player__song-singer");
        this.elAudioCurrentTime = document.querySelector("#audio-current-time");
        this.elAudioTotalTime = document.querySelector("#audio-total-time");
        this.elIconPlay = this.elPlayBtn.querySelector(".play-icon");
        this.elIconPause = this.elPlayBtn.querySelector(".pause-icon");
        this.elAudio = document.createElement("audio");

        this.currentTime = 0;
        this.volume = 1;
        this.play = false;
        this.progressTimeRange = null;
        this.progressVolumeRange = null;
        this.audioData = {};
        this.playlistData = [];
    }

    _getActiveDataFromLocalStorage(dataName, defaultValue) {
        const data = localStorage.getItem(dataName);

        return data ? JSON.parse(data) : defaultValue;
    }

    playAudio(audioSrc) {
        if (audioSrc !== this.elAudio.src) {
            this.elAudio.src = audioSrc;
            this.play = true;
        }

        this._changeShowIconsAtPlayBtn();

        const promise = fetch(audioSrc)
            .then((res) => res.blob())
            .then(() => this.elAudio.play());

        if (promise !== undefined) {
            promise
                .then(() => this.elAudio[this.play ? "play" : "pause"]())
                .catch((err) => {
                    throw err;
                });
        }
    }

    _changeShowIconsAtPlayBtn() {
        if (this.play) {
            this.elIconPlay.classList.add("hide");
            this.elIconPause.classList.remove("hide");
        } else {
            this.elIconPause.classList.add("hide");
            this.elIconPlay.classList.remove("hide");
        }
    }

    _stateDefaultData(add = true) {
        const methodForClasses = add ? "add" : "remove";
        const methodForAttributes = add ? "setAttribute" : "removeAttribute";

        this.elAudioName.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioSinger.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioCurrentTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioTotalTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioTotalTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elPosterWrapper.classList[methodForClasses]("audio-player--disabled-data");

        this.elPlayBtn[methodForAttributes]("disabled", true);
        this.elPrevBtn[methodForAttributes]("disabled", true);
        this.elNextBtn[methodForAttributes]("disabled", true);
    }

    displayAudioData(audio, setTimeToElement = false) {
        if (!Object.keys(audio).length) {
            this._stateDefaultData();
            return;
        }

        this._stateDefaultData(false);

        const { name, poster, singer, time, duration, } = audio;

        this.elPoster.src = `${host}/storage/posters/${poster}`;
        this.elAudioName.textContent = name;
        this.elAudioSinger.textContent = singer;
        this.elAudioTotalTime.textContent = time;
        this.audioData = audio;

        this.progressTimeRange = new CustomRange(duration, "#audio-progress", (v) => {
            this.currentTime = v;
            this._displayCurrentTime.call(this, true);
        }).init();

        this.progressVolumeRange = new CustomRange(1, "#volume-progress", (v) => {
            this.volume = v;
            this._setVolumeAudio.call(this);
        }).init();

        this._displayCurrentTime(setTimeToElement);
        this._setTimeupdate();
    }

    _displayCurrentTime(setTimeToElement = false) {
        this.elAudioCurrentTime.textContent = convertToCorrectTime(this.currentTime);

        localStorage.setItem("currentTime", this.currentTime);

        if (this.progressTimeRange) {
            this.progressTimeRange.setPosition(this.currentTime);
        }

        if (setTimeToElement) {
            this.elAudio.currentTime = this.currentTime;
        }
    }

    _setVolumeAudio() {
        this.elAudio.volume = this.volume;

        localStorage.setItem("volume", this.volume);

        if (this.progressVolumeRange) {
            this.progressVolumeRange.setPosition(this.volume);
        }
    }

    _setTimeupdate() {
        this.elAudio.addEventListener("timeupdate", () => {
            this.currentTime = this.elAudio.currentTime;

            this._displayCurrentTime();
        });
    }

    _setEventPlayBtn() {
        this.elPlayBtn.addEventListener("click", () => {
            this.play = !this.play;

            this.playAudio(`${host}/storage/audio/${this.audioData.path}`);
        });
    }

    init() {
        const localAudio = this._getActiveDataFromLocalStorage("audio", {});
        const localPlaylist = this._getActiveDataFromLocalStorage("playlist", []);
        const localVolume = this._getActiveDataFromLocalStorage("volume", 1);
        const currentTime = this._getActiveDataFromLocalStorage("currentTime", 0);

        this.audioData = localAudio;
        this.playlistData = localPlaylist;
        this.volume = localVolume;
        this.currentTime = currentTime;

        this.displayAudioData(localAudio, true);
        this._setVolumeAudio();
        this._setEventPlayBtn();

        return this;
    }
}