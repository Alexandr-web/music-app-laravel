function uploadFile(selectorInput, selectorImg, selectorText, selectorLoader) {
	const input = document.querySelector(selectorInput);
	const img = document.querySelector(selectorImg);
	const text = document.querySelector(selectorText);
	const loader = document.querySelector(selectorLoader);

	input.addEventListener("change", (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		loader.classList.remove("hide");

		reader.onload = () => {
			img.src = reader.result;
			text.classList.add("hide");
			img.classList.remove("hide");
			loader.classList.add("hide");
		};

		reader.onerror = () => {
			console.error(reader.error);
			loader.classList.add("hide");
		};
	});
}

export default uploadFile;