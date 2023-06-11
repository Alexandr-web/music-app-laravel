import ValidForm from "../helpers/ValidForm";
import uploadFile from "../scripts/uploadFile";
import AudioSearch from "../classes/AudioSearch";

window.addEventListener("load", () => {
    const options = {
        poster: { file: true, },
        name: { min: 3, max: 26, },
        audio: { optional: true, min: 3, max: 46, },
    };
    const audioSearch = new AudioSearch().search();
    const callbackWhenAllCompleted = (fd) => {
        console.log(fd, audioSearch.addedAudiosId);
    };

    new ValidForm("#add-playlist-form", options, callbackWhenAllCompleted).init();

    uploadFile("#poster", ".file-upload-area__poster .file-upload-area__text", ".file-upload-area__poster .loader", (file, result) => {
        const image = document.querySelector(".file-upload-area__poster .file-upload-area__poster-img");

        image.src = result;
        image.classList.remove("hide");
    });
});