import ValidForm from "../classes/ui/ValidForm";
import uploadFile from "../scripts/uploadFile";
import AudioSearch from "../classes/ui/AudioSearch";
import Alert from "../classes/ui/Alert";
import Playlist from "../classes/request/Playlist";

export default (audioplayer) => {
    if (!document.querySelector("#add-playlist-form")) {
        return;
    }

    const options = {
        poster: { file: true, },
        name: { min: 3, max: 26, },
        audio: { optional: true, min: 3, max: 46, },
    };
    const alert = new Alert().init();
    const audioSearch = new AudioSearch(audioplayer).search();
    const callbackWhenAllCompleted = (fd) => {
        const addedAudio = audioSearch.addedAudiosId;

        if (!addedAudio.length) {
            alert.show("Должна быть добавлена хотя бы одна песня", false);
            return;
        }

        fd.append("addedAudio", JSON.stringify(addedAudio));

        new Playlist().add(fd).then(({ success, message, }) => {
            alert.show(message, success);
        }).catch((err) => {
            throw err;
        });
    };

    new ValidForm("#add-playlist-form", options, callbackWhenAllCompleted).init();

    uploadFile("#poster", ".file-upload-area__poster .file-upload-area__text", ".file-upload-area__poster .loader", (file, result) => {
        const image = document.querySelector(".file-upload-area__poster .file-upload-area__poster-img");

        image.src = result;
        image.classList.remove("hide");
    });
};