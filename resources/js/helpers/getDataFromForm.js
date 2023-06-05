function getDataFromForm(event) {
	const result = {};

	[...event.target.elements]
		.filter(({ nodeName, type, }) => nodeName === "INPUT" && type !== "submit")
		.map(({ name, value, }) => result[name] = value);

	return result;
}

export default getDataFromForm;