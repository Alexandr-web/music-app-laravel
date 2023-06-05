function closeAlert(selectorAlert, selectorClose) {
	const alert = document.querySelector(selectorAlert);
	const close = document.querySelector(selectorClose);

	close.addEventListener("click", () => alert.classList.add("hide"));
}

export default closeAlert;