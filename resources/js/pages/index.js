import Audioplayer from "../classes/ui/AudioPlayer";
import musicScripts from "./music";
import playlistScripts from "./playlist";
import userScripts from "./user/index";
import switchingHistory from "../scripts/switchingHistory";

window.addEventListener("load", () => {
    const audioplayer = new Audioplayer().init();

    userScripts(audioplayer);
    musicScripts();
    playlistScripts();
    switchingHistory();
});