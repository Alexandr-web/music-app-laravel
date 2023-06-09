function initAlert(success, message) {
	const alert = document.querySelector(".alert");
	const alertText = alert.querySelector(".alert__text");
	const icon = alert.querySelector(`.alert__icon--${success ? "success" : "error"}`);
	const allIcons = document.querySelectorAll(".alert__icon");

	allIcons.forEach((item) => item.classList.add("hide"));
	alert.className = `alert alert--${success ? "success" : "error"}`;
	icon.classList.remove("hide");
	alertText.textContent = message;
}

export default initAlert;