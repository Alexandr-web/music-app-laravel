export default (file) => {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
        const audio = document.createElement("audio");

        audio.muted = true;
        audio.src = url;
        audio.preload = "metadata";

        audio.addEventListener("loadedmetadata", () => resolve(audio.duration));
    });
};