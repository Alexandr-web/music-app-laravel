import getHTMLStringPlayIcon from "./getHTMLStringPlayIcon";
import getHTMLStringPauseIcon from "./getHTMLStringPauseIcon";
import getHTMLStringPlusIcon from "./getHTMLStringPlusIcon";
import getHTMLStringCrossIcon from "./getHTMLStringCrossIcon";
import host from "./host";

export default (audioData, playlistId, play = false, add = true, poster = false) => {
    const htmlStringPoster = `
        <div class="audio__poster">
            <img class="audio__poster-image" src="${host}/storage/posters/${audioData.poster}" alt="Постер песни &quot;${audioData.name}&quot;">    
        </div>
    `;

    return `
    <div class="audio" data-audio-id="${audioData.id}" data-playlist-id="${playlistId}">
        <div class="audio__block audio__block-play">
            <button class="btn audio__btn audio__play-btn" type="button">
                ${getHTMLStringPlayIcon(!play)}
                ${getHTMLStringPauseIcon(play)}
            </button>
        </div>
        <div class="audio__block audio__block-info-audio">
            ${poster ? htmlStringPoster : ""}
            <div class="audio__song-info">
                <h4 class="audio__name">${audioData.name}</h4>
                <h5 class="audio__singer">${audioData.singer}</h5>
            </div>
        </div>
        <div class="audio__block audio__block-options">
            <button class="btn audio__btn audio__add-btn" type="button">
                ${getHTMLStringPlusIcon(!add)}
                ${getHTMLStringCrossIcon(add)}
            </button>
        </div>
    </div>
    `;
};