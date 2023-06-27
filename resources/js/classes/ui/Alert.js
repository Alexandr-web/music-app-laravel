export default class Alert {
	constructor() {
		this.alert = document.querySelector(".alert");
		this.alertText = this.alert.querySelector(".alert__text");
		this.btnClose = this.alert.querySelector(".alert__close");
		this.icons = this.alert.querySelectorAll(".alert__icon");
	}

	_close() {
		this.btnClose.addEventListener("click", () => {
			this.alert.classList.add("hide");
			this._hideAllIcons();
		});
	}

	_hideAllIcons() {
		this.icons.forEach((icon) => icon.classList.add("hide"));
	}

	_showIcon(success) {
		[...this.icons]
			.find((icon) => icon.dataset.alertIcon === (success ? "success" : "error"))
			.classList
			.remove("hide");
	}

	_clearOldStyles() {
		this._hideAllIcons();
		this.alert.className = "alert";
	}

	show(message, success) {
		this._clearOldStyles();
		this._showIcon(success);

		this.alert.classList.add(`alert--${success ? "success" : "error"}`);
		this.alertText.textContent = message;
	}

	init() {
		this._close();

		return this;
	}
}