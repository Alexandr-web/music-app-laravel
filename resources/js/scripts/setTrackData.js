import Audio from "../classes/Audio";
import User from "../classes/User";
import host from "../helpers/host";

function clearActiveClassAtAudioElements(elements) {
    elements.forEach((el) => el.classList.remove("audio--active"));
}

function setActiveClassToAudioEl(el) {
    el.classList.add("audio--active");
}

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
        audioplayer.playlistData = audioIds;

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

                        clearActiveClassAtAudioElements(elements);
                        setActiveClassToAudioEl(track);

                        localStorage.setItem("audio", JSON.stringify(audio));
                        localStorage.setItem("playlist", JSON.stringify(audioIds));

                        audioplayer.play = !audioplayer.play;

                        audioplayer.displayAudioData(audio);
                        audioplayer.playAudio(`${host}/storage/audio/${audio.path}`);
                    }).catch((err) => {
                        throw err;
                    });
            });
        });
    });
};