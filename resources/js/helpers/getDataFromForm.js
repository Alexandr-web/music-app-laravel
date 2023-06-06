function getDataFromForm(formEl, file = null) {
	if (formEl instanceof HTMLFormElement) {
		const formData = new FormData(formEl);

		if (file) formData.append("avatar", file);

		return formData;
	}

	return {};
}

export default getDataFromForm;