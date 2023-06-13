<div class="modal-window-playlist hide">
    <div class="modal-window-playlist__inner">
        <div class="modal-window-playlist__info">
            <div class="modal-window-playlist__poster">
                <img class="modal-window-playlist__poster-image" src="" alt="Постер плейлиста">
            </div>
            <div class="modal-window-playlist__data">
                <h2 class="modal-window-playlist__name"></h2>
            </div>
        </div>
        <div class="modal-window-playlist__controls">
            <a class="link modal-window-playlist__link" href="">Изменить</a>
            <button class="btn modal-window-playlist__btn-remove">Удалить</button>
        </div>
        <div class="modal-window-playlist__audio">
            <h3 class="modal-window-playlist__audio-title"></h3>
            <ul class="modal-window-playlist__audio-list">
                <li class="modal-window-playlist__audio-item">
                    <div class="audio" data-audio-id="">
                        <div class="audio__block">
                            <button class="btn audio__btn audio__play-btn">
                                <x-play-icon :show="true" />
                                <x-pause-icon />
                            </button>
                        </div>
                        <div class="audio__block audio__block--flex">
                            <div class="audio__poster">
                                <img class="audio__poster-image" src="" alt="">
                            </div>
                            <div class="audio__song-info">
                                <h4 class="audio__name"></h4>
                                <h5 class="audio__singer"></h5>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>