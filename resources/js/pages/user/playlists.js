import Playlist from "../../classes/request/Playlist";
import ModalWindowPlaylist from "../../classes/ui/ModalWindowPlaylist";
import setTrackData from "../../scripts/setTrackData";

export default (audioplayer) => {
    const playlistsList = document.querySelector(".playlists");

    if (!playlistsList) {
        return;
    }

    const playlists = document.querySelectorAll(".playlist");

    playlists.forEach((playlist) => {
        const dataId = parseInt(playlist.dataset.id);

        playlist.addEventListener("click", () => {
            new Playlist().getOne(dataId)
                .then(({ success, playlist: { id, poster, audio, name, }, }) => {
                    if (!success) {
                        return;
                    }

                    const modalWindowPlaylist = new ModalWindowPlaylist(id, JSON.parse(audio)).init();

                    modalWindowPlaylist.setData(poster, name, id, () => {
                        setTrackData(".modal-window-playlist .audio", audioplayer, JSON.parse(audio));

                        audioplayer.setActiveClassToAudioById(audioplayer.audioData.id);
                    });
                }).catch((err) => {
                    throw err;
                });
        });
    });
};