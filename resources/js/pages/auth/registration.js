import uploadFile from "../../scripts/uploadFile";
import registration from "../../scripts/registration";

window.addEventListener("load", () => {
	uploadFile("#avatar", ".file-upload-area__text", ".loader", (file, result) => {
		const image = document.querySelector(".file-upload-area__avatar-img");

		image.src = result;
		image.classList.remove("hide");
	});
	registration();
});