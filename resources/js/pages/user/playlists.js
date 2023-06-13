import Playlist from "../../classes/Playlist";
import ModalWindowPlaylist from "../../classes/ModalWindowPlaylist";

export default () => {
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

                    modalWindowPlaylist.setData(poster, name, id);
                }).catch((err) => {
                    throw err;
                });
        });
    });
};