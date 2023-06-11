export default (selectorInput, selectorText, selectorLoader, callbackWhenUpload) => {
	const input = document.querySelector(selectorInput);
	const text = document.querySelector(selectorText);
	const loader = document.querySelector(selectorLoader);

	input.addEventListener("change", (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		loader.classList.remove("hide");

		reader.onload = () => {
			text.classList.add("hide");
			loader.classList.add("hide");

			callbackWhenUpload(file, reader.result);
		};

		reader.onerror = () => {
			console.error(reader.error);
			loader.classList.add("hide");
		};
	});
};