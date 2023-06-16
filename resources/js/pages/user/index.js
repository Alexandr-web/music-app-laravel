import settingsScripts from "./settings";
import playlistsScripts from "./playlists";
import audioScripts from "./audio";

export default (audioplayer) => {
    audioScripts(audioplayer);
    settingsScripts();
    playlistsScripts(audioplayer);
};