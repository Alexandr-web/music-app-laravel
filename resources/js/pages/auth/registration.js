import uploadFile from "../../scripts/uploadFile";
import registration from "../../scripts/registration";

window.addEventListener("load", () => {
	uploadFile(
		"#avatar", ".file-upload-area__avatar-img",
		".file-upload-area__text", "#file--loader"
	);
	registration();
});