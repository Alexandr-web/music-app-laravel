import Audio from "../classes/request/Audio";
import User from "../classes/request/User";
import getStoragePath from "../helpers/getStoragePath";

export default (selectorElements, audioplayer, arrayAudioId = []) => {
    const elements = document.querySelectorAll(selectorElements);

    if (!elements.length) {
        return;
    }

    new Promise((resolve) => {
        if (arrayAudioId.length) {
            resolve(arrayAudioId);
            return;
        }

        const playlistId = elements[0].dataset.playlistId;

        if (isNaN(parseInt(playlistId))) {
            switch (playlistId) {
                case "home":
                    new Audio()
                        .getAll()
                        .then(({ success, audio, }) => {
                            if (!success) {
                                return;
                            }

                            resolve(audio.map(({ id, }) => id));
                        });
                    break;
                case "profile":
                    new User()
                        .getByToken()
                        .then(({ success, user, }) => {
                            if (!success) {
                                return;
                            }

                            resolve(JSON.parse(user.audio));
                        });
                    break;
            }
        }
    }).then((audioIds) => {
        elements.forEach((track) => {
            const audioId = parseInt(track.dataset.audioId);
            const playBtn = track.querySelector(".audio__play-btn");

            playBtn.addEventListener("click", () => {
                new Audio()
                    .getOne(audioId)
                    .then(({ success, audio, }) => {
                        if (!success) {
                            return;
                        }

                        audioplayer.playlistData = audioIds;
                        audioplayer.play = !audioplayer.play;

                        audioplayer.setActiveClassToAudioById(audio.id, selectorElements);
                        audioplayer.displayAudioData(audio);
                        audioplayer.playAudio(getStoragePath("audio", audio.path));
                    }).catch((err) => {
                        throw err;
                    });
            });
        });
    });
};