import ValidForm from "../classes/ValidForm";
import uploadFile from "../scripts/uploadFile";
import Audio from "../classes/Audio";
import getAudioDuration from "../helpers/getAudioDuration";
import convertToCorrectTime from "../helpers/convertToCorrectTime";
import Alert from "../classes/Alert";

export default () => {
    if (!document.querySelector("#add-music-form")) {
        return;
    }

    const alert = new Alert().init();
    const options = {
        poster: { file: true, },
        audio: { file: true, },
        name: { min: 3, max: 46, },
        singer: { min: 1, max: 16, },
    };
    const callbackWhenAllCompleted = (fd) => {
        getAudioDuration(fd.get("audio"))
            .then((duration) => {
                fd.append("time", convertToCorrectTime(duration));
                fd.append("duration", duration);

                new Audio()
                    .add(fd)
                    .then(({ success, message, }) => {
                        alert.show(message, success);
                    }).catch((err) => {
                        throw err;
                    });
            });
    };

    new ValidForm("#add-music-form", options, callbackWhenAllCompleted).init();

    uploadFile("#poster", ".file-upload-area__poster .file-upload-area__text", ".file-upload-area__poster .loader", (file, result) => {
        const image = document.querySelector(".file-upload-area__poster .file-upload-area__poster-img");

        image.src = result;
        image.classList.remove("hide");
    });

    uploadFile("#audio", ".file-upload-area__audio .file-upload-area__text", ".file-upload-area__audio .loader", (file) => {
        const audioInfo = document.querySelector(".file-upload-area__audio-info");
        const audioName = document.querySelector(".file-upload-area__audio-name");
        const audioSize = document.querySelector(".file-upload-area__audio-size");
        const mb = (file.size / 1024 / 1024).toFixed(2);

        audioInfo.classList.remove("hide");
        audioName.textContent = file.name;
        audioSize.textContent = `${mb} мб`;
    });
};