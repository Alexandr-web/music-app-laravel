<div class="audio-player">
    <div class="audio-player__inner">
        <div class="audio-player__block audio-player__song">
            <img class="audio-player__poster" src="https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png" alt="Постер аудио">
            <div class="audio-player__song-info">
                <h3 class="audio-player__song-name">Bleach</h3>
                <h4 class="audio-player__song-singer">$uicideboy$</h4>
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
            <div class="audio-player__time">00:00</div>
            <x-custom-range id="audio-progress" />
            <div class="audio-player__time">03:21</div>
        </div>
        <div class="audio-player__block audio-player__volume">
            <x-volume-icon />
            <x-custom-range id="volume-progress" />
        </div>
    </div>
</div>