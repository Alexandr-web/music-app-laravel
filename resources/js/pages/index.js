import Audioplayer from "../classes/ui/AudioPlayer";
import musicScripts from "./music";
import playlistScripts from "./playlist";
import userScripts from "./user/index";

window.addEventListener("load", () => {
    const audioplayer = new Audioplayer().init();

    userScripts(audioplayer);
    musicScripts();
    playlistScripts();
});