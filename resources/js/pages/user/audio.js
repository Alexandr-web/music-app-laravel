import setTrackData from "../../scripts/setTrackData";

export default (audioplayer) => {
    setTrackData(".audio[data-audio-id]", audioplayer);
};