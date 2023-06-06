function getDataFromForm(formEl) {
	if (formEl instanceof HTMLFormElement) return new FormData(formEl);

	return {};
}

export default getDataFromForm;