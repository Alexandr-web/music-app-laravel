import Audioplayer from "../classes/ui/AudioPlayer";
import musicScripts from "./music";
import playlistScripts from "./playlist";
import userScripts from "./user/index";
import switchingHistory from "../scripts/switchingHistory";
import setAnim from "../scripts/setAnim";
import setPlaylistsAnim from "../scripts/setPlaylistsAnim";

window.addEventListener("load", () => {
    const audioplayer = new Audioplayer().init();

    setPlaylistsAnim();
    setAnim(".welcome__title", { duration: 3000, opacity: [0, 1], translateY: [50, 0], });
    userScripts(audioplayer);
    playlistScripts(audioplayer);
    musicScripts();
    switchingHistory();
});