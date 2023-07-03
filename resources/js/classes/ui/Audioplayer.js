import convertToCorrectTime from "../../helpers/convertToCorrectTime";
import CustomRange from "./CustomRange";
import Audio from "../request/Audio";
import getStoragePath from "../../helpers/getStoragePath";
import setAnim from "../../scripts/setAnim";

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
        this.elAudioInfo = document.querySelector(".audio-player__song");
        this.elCanvasAnim = document.querySelector(".audio-player__anim-canvas");

        this.gainNode = null;
        this.audioContext = null;
        this.progressTimeRange = null;
        this.progressVolumeRange = null;
        this.audioAnalyser = null;
        this.isGrabbing = false;
        this.play = false;
        this.animIsActive = false;
        this.currentTime = 0;
        this.audioData = {};
        this.playlistData = [];
    }

    setActiveClassToAudioById(activeId, selectorElements = ".audio", activeClassName = "audio--active") {
        const audioElements = document.querySelectorAll(selectorElements);

        if (!audioElements.length) {
            return;
        }

        const activeEl = [...audioElements].find((audio) => parseInt(audio.dataset.audioId) === activeId);

        if (!activeEl) {
            return;
        }

        audioElements.forEach((audio) => {
            const playIcon = audio.querySelector(".play-icon");
            const pauseIcon = audio.querySelector(".pause-icon");

            audio.classList.remove(activeClassName);

            this._changeShowIconsAtPlayBtn(playIcon, pauseIcon, true);
        });

        const playIconAtActiveEl = activeEl.querySelector(".play-icon");
        const pauseIconAtActiveEl = activeEl.querySelector(".pause-icon");

        activeEl.classList.add(activeClassName);

        this._changeShowIconsAtPlayBtn(playIconAtActiveEl, pauseIconAtActiveEl);
    }

    _getActiveAudioElements() {
        const activeAudio = document.querySelector(".audio--active");
        const playIconAtActiveEl = activeAudio.querySelector(".play-icon");
        const pauseIconAtActiveEl = activeAudio.querySelector(".pause-icon");

        return {
            playIcon: playIconAtActiveEl,
            pauseIcon: pauseIconAtActiveEl,
        };
    }

    playAudio(audioSrc) {
        if (audioSrc !== this.elAudio.src) {
            this.elAudio.src = audioSrc;
            this.play = true;
        }

        this._changeShowIconsAtPlayBtn(this.elIconPlay, this.elIconPause);
        this._setDisabledControlsBtn();

        const promise = this.elAudio.play();

        if (promise instanceof Promise) {
            promise
                .then(() => {
                    this._setDisabledControlsBtn(false);

                    if (this.audioContext instanceof AudioContext && this.audioContext.state === "suspended") {
                        this.audioContext.resume();
                    }

                    if (this.play) {
                        this.elAudio.play();

                        this._initAudioContext();

                        if (!this.animIsActive) {
                            this.animIsActive = true;

                            this._setAudioBarsAnim();
                        }
                    } else {
                        this.elAudio.pause();
                    }
                }).catch((err) => {
                    throw err;
                });
        }
    }

    _initAudioContext() {
        if (this.audioContext instanceof AudioContext) {
            return;
        }

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.audioAnalyser = this.audioContext.createAnalyser();

        const source = this.audioContext.createMediaElementSource(this.elAudio);

        this.audioAnalyser.fftSize = 2048;

        source
            .connect(this.gainNode)
            .connect(this.audioAnalyser)
            .connect(this.audioContext.destination);
    }

    _getActiveDataFromLocalStorage(dataName, defaultValue) {
        const data = localStorage.getItem(dataName);

        return data ? JSON.parse(data) : defaultValue;
    }

    _getIdxActiveAudio() {
        const { id, } = this.audioData;

        return this.playlistData.indexOf(id);
    }

    _checkSwitchingIdx(idx) {
        if (idx > this.playlistData.length - 1) {
            return 0;
        }

        if (idx < 0) {
            return this.playlistData.length - 1;
        }

        return idx;
    }

    _switchAudio(next = true) {
        if (this.playlistData.length < 2) {
            return;
        }

        const activeIdx = this._getIdxActiveAudio();
        const newIdx = this._checkSwitchingIdx(activeIdx + (next ? 1 : -1));
        const newActiveId = this.playlistData[newIdx];

        new Audio()
            .getOne(newActiveId)
            .then(({ success, audio, }) => {
                if (!success) {
                    return;
                }

                this.play = true;

                setAnim(this.elAudioInfo, { opacity: [0, 1], translateX: [100, 0], duration: 2000, });

                this.displayAudioData(audio);
                this.setActiveClassToAudioById(audio.id);
                this.playAudio(getStoragePath("audio", audio.path));
            });
    }

    _setEventSwitchingAudio(btn, next) {
        btn.addEventListener("click", this._switchAudio.bind(this, next));
    }

    _changeShowIconsAtPlayBtn(iconPlay, iconPause, showPlay) {
        if (showPlay !== undefined) {
            if (showPlay) {
                iconPause.classList.add("hide");
                iconPlay.classList.remove("hide");
            } else {
                iconPause.classList.remove("hide");
                iconPlay.classList.add("hide");
            }

            return;
        }

        if (this.play) {
            iconPlay.classList.add("hide");
            iconPause.classList.remove("hide");
        } else {
            iconPause.classList.add("hide");
            iconPlay.classList.remove("hide");
        }
    }

    _stateDefaultData(add = true) {
        const methodForClasses = add ? "add" : "remove";

        this.elAudioName.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioSinger.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioCurrentTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioTotalTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elAudioTotalTime.classList[methodForClasses]("audio-player--disabled-data");
        this.elPosterWrapper.classList[methodForClasses]("audio-player--disabled-data");

        this._setDisabledControlsBtn(add);
    }

    _displayCurrentTime(setTimeToElement = false, displayCurrentTime = true, changeProgressTimeRange = true) {
        if (displayCurrentTime) {
            this.elAudioCurrentTime.textContent = convertToCorrectTime(this.currentTime);
        }

        localStorage.setItem("currentTime", this.currentTime);

        if (this.progressTimeRange && changeProgressTimeRange) {
            this.progressTimeRange.setPosition(this.currentTime);
        }

        if (setTimeToElement) {
            this.elAudio.currentTime = this.currentTime;
        }
    }

    _setVolumeAudio() {
        this.elAudio.volume = this.volume;

        localStorage.setItem("volume", this.volume);

        if (this.gainNode instanceof GainNode) {
            this.gainNode.gain.value = this.volume;
        }

        if (this.progressVolumeRange) {
            this.progressVolumeRange.setPosition(this.volume);
        }
    }

    _setTimeupdate() {
        this.elAudio.addEventListener("timeupdate", () => {
            this.currentTime = this.elAudio.currentTime;

            this._displayCurrentTime(false, !this.isGrabbing, !this.isGrabbing);
        });
    }

    _setAudioBarsAnim() {
        const canvas = this.elCanvasAnim;
        const ctx = canvas.getContext("2d");
        const countLinesOnArea = 250;
        const widthLine = canvas.offsetWidth / countLinesOnArea;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const drawBars = () => {
            const fbcArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);

            this.audioAnalyser.getByteFrequencyData(fbcArray);

            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            fbcArray.slice(0, countLinesOnArea).forEach((n, i) => {
                const x = i * widthLine;
                const percent = Math.ceil((n / 255) * 100);
                const height = (percent * canvas.offsetHeight) / 100;

                ctx.fillStyle = "white";
                ctx.fillRect(x, canvas.offsetHeight - height, widthLine, height);
            });

            (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(drawBars);
        };

        drawBars();
    }

    _setEventPlayBtn() {
        this.elPlayBtn.addEventListener("click", () => {
            this.play = !this.play;

            this.playAudio(getStoragePath("audio", this.audioData.path));

            const { playIcon, pauseIcon, } = this._getActiveAudioElements();

            this._changeShowIconsAtPlayBtn(playIcon, pauseIcon);
        });
    }

    _setEventEndedAudio() {
        if (!this.elAudio) {
            return;
        }

        this.elAudio.addEventListener("ended", () => {
            this.play = false;

            this._changeShowIconsAtPlayBtn(this.elIconPlay, this.elIconPause);
            this._switchAudio();
        });
    }

    _setDisabledControlsBtn(add = true) {
        const method = add ? "setAttribute" : "removeAttribute";

        this.elPlayBtn[method]("disabled", add ? true : undefined);
        this.elPrevBtn[method]("disabled", add ? true : undefined);
        this.elNextBtn[method]("disabled", add ? true : undefined);
    }

    _setProgressTimeRange(duration) {
        const callbackWhenEndGrabbing = (v) => {
            this.currentTime = v;
            this.isGrabbing = false;

            this._displayCurrentTime.call(this, true);
        };
        const callbackWhenGrabbing = (v) => {
            this.currentTime = v;
            this.isGrabbing = true;

            this._displayCurrentTime.call(this);
        };

        this.progressTimeRange = new CustomRange(+duration, "#audio-progress", callbackWhenEndGrabbing, callbackWhenGrabbing).init(this.currentTime);
    }

    _setProgressVolumeRange() {
        this.progressVolumeRange = new CustomRange(1, "#volume-progress", null, (v) => {
            this.volume = v;

            this._setVolumeAudio.call(this);
        }).init(this.volume);
    }

    displayAudioData(audio, setTimeToElement = false) {
        if (!Object.keys(audio).length) {
            this._stateDefaultData();
            return;
        }

        this._stateDefaultData(false);

        const { name, poster, singer, time, duration, id, } = audio;

        this.elPoster.src = getStoragePath("posters", poster);
        this.elAudioName.textContent = name;
        this.elAudioSinger.textContent = singer;
        this.elAudioTotalTime.textContent = time;
        this.audioData = audio;

        this._setProgressTimeRange(duration);
        this._setProgressVolumeRange();

        localStorage.setItem("audio", JSON.stringify(this.audioData));
        localStorage.setItem("playlist", JSON.stringify(this.playlistData));

        this.setActiveClassToAudioById(id);
        this._displayCurrentTime(setTimeToElement);
        this._setTimeupdate();
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
        this._setEventEndedAudio();
        this._setEventSwitchingAudio(this.elPrevBtn, false);
        this._setEventSwitchingAudio(this.elNextBtn);

        return this;
    }
}