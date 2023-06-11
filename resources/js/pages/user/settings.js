import ValidForm from "../../helpers/ValidForm";
import changePasswordState from "../../scripts/changePasswordState";
import uploadFile from "../../scripts/uploadFile";

export default () => {
    const form = document.querySelector(".form#edit-form");

    if (!form) {
        return;
    }

    const options = {
        avatar: { optional: true, file: true, },
        nickname: { optional: true, min: 3, max: 16, },
        password: { optional: true, min: 9, },
        email: { optional: true, email: true, },
    };
    const callbackWhenAllCompleted = (fd) => {
        console.log("all complete!");
    };

    new ValidForm(".form#edit-form", options, callbackWhenAllCompleted).init();

    changePasswordState("#password", "#controls-btn-password", "#open-eye-icon", "#closed-eye-icon");
    uploadFile("#avatar", ".file-upload-area__text", ".loader", (file, result) => {
        const image = document.querySelector(".file-upload-area__avatar-img");

        image.src = result;
        image.classList.remove("hide");
    });
};