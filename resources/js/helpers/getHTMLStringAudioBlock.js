import getHTMLStringPlayIcon from "./getHTMLStringPlayIcon";
import getHTMLStringPauseIcon from "./getHTMLStringPauseIcon";
import getHTMLStringPlusIcon from "./getHTMLStringPlusIcon";
import getHTMLStringCrossIcon from "./getHTMLStringCrossIcon";

export default (audioData, play = false, add = true) => {
    return `
    <div class="audio" data-audio-id="${audioData.id}">
        <div class="audio__block">
            <button class="btn audio__btn audio__play-btn" type="button">
                ${getHTMLStringPlayIcon(!play)}
                ${getHTMLStringPauseIcon(play)}
            </button>
        </div>
        <div class="audio__block">
            <div class="audio__song-info">
                <h4 class="audio__name">${audioData.name}</h4>
                <h5 class="audio__singer">${audioData.singer}</h5>
            </div>
        </div>
        <div class="audio__block">
            <button class="btn audio__btn audio__add-btn" type="button">
                ${getHTMLStringPlusIcon(!add)}
                ${getHTMLStringCrossIcon(add)}
            </button>
        </div>
    </div>
    `;
};