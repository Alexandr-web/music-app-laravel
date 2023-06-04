function uploadAvatar(selectorInput, selectorImg, selectorAvatarText, selectorLoader) {
	const input = document.querySelector(selectorInput);
	const avatar = document.querySelector(selectorImg);
	const text = document.querySelector(selectorAvatarText);
	const loader = document.querySelector(selectorLoader);

	input.addEventListener("change", (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);

		loader.classList.remove("hide");

		reader.onload = () => {
			avatar.src = reader.result;
			text.classList.add("hide");
			avatar.classList.remove("hide");
			loader.classList.add("hide");
		};
		reader.onerror = () => {
			console.error(reader.error);
			loader.classList.add("hide");
		};
	});
}

export default uploadAvatar;