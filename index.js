export default class Audioplayer {
    constructor() {
        this.play = false;
        this.elAudio = document.createElement("audio");
        this.animIsActive = false;
    }

    playAudio(audioSrc) {
        if (audioSrc !== this.elAudio.src) {
            this.elAudio.src = audioSrc;
            this.play = true;
        }

        const promise = fetch(audioSrc)
            .then((res) => res.blob())
            .then(() => this.elAudio.play());

        if (promise !== undefined) {
            promise
                .then(() => {
                    if (this.play) {
                        this.elAudio.play();

                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        const source = ctx.createMediaElementSource(this.elAudio);
                        const audioAnalyser = ctx.createAnalyser();

                        audioAnalyser.connect(ctx.destination);

                        source.connect(ctx.destination);
                        source.connect(audioAnalyser);

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
}