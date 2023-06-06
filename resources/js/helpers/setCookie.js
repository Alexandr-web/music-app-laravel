function setCookie(name, data, days = 1) {
	const expires = days * 60 * 60 * 24;

	document.cookie = `${name}=${JSON.stringify(data)};expires=${expires};`;
}

export default setCookie;