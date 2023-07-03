import setAnim from "./setAnim";

export default () => {
    const playlists = document.querySelectorAll(".playlist");

    playlists.forEach((playlist, index) => {
        setAnim(playlist, {
            duration: 1000,
            delay: index * 100,
            opacity: [0, 1],
            translateY: [20, 0],
        });
    });
};