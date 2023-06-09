<div class="audio-player">
    <div class="audio-player__inner">
        <div class="audio-player__block audio-player__song-block">
            <div class="audio-player__song">
                <div class="audio-player__poster">
                    <div class="audio-player__block audio-player__anim">
                        <canvas class="audio-player__anim-canvas"></canvas>
                    </div>
                    <img class="audio-player__poster-image" src="" alt="Постер аудио">
                </div>
                <div class="audio-player__song-info">
                    <h3 class="audio-player__song-name"></h3>
                    <h4 class="audio-player__song-singer"></h4>
                </div>
            </div>
        </div>
        <div class="audio-player__block audio-player__controls">
            <button class="btn audio-player__controls-btn" id="audio-prev-btn">
                <x-prev-icon />
            </button>
            <button class="btn audio-player__controls-btn" id="audio-play-btn">
                <x-play-icon :show="true" />
                <x-pause-icon />
            </button>
            <button class="btn audio-player__controls-btn" id="audio-next-btn">
                <x-next-icon />
            </button>
        </div>
        <div class="audio-player__block audio-player__progress">
            <div class="audio-player__time" id="audio-current-time"></div>
            <x-custom-range id="audio-progress" />
            <div class="audio-player__time" id="audio-total-time"></div>
        </div>
        <div class="audio-player__block audio-player__volume">
            <x-volume-icon />
            <x-custom-range id="volume-progress" />
        </div>
    </div>
</div>