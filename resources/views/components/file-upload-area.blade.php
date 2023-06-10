<div class="file-upload-area">
    @if ($isAvatar)
        <label class="file-upload-area__label file-upload-area__avatar" for="{{ $id }}">
            <input class="file-upload-area__input" id="{{ $id }}" name="{{ $name }}" type="file" accept="{{ join(",", $accept) }}">
            <span class="file-upload-area__text {{ $defaultSrc ? 'hide' : '' }}">Загрузить фотографию</span>
            <img class="file-upload-area__avatar-img {{ $defaultSrc ? '' : 'hide' }}" src="{{ $defaultSrc ?? '' }}" alt="Аватар пользователя">
            <x-loader />
        </label>
    @endif

    @if ($isPoster)
        <label class="file-upload-area__label file-upload-area__poster" for="{{ $id }}">
            <input class="file-upload-area__input" id="{{ $id }}" name="{{ $name }}" type="file" accept="{{ join(",", $accept) }}">
            <span class="file-upload-area__text {{ $defaultSrc ? 'hide' : '' }}">Загрузить фотографию</span>
            <img class="file-upload-area__poster-img {{ $defaultSrc ? '' : 'hide' }}" src="{{ $defaultSrc ?? '' }}" alt="Постер">
            <x-loader />
        </label>
    @endif

    @if ($isAudio)
        <label class="file-upload-area__label file-upload-area__audio" for="{{ $id }}">
            <input class="file-upload-area__input" id="{{ $id }}" name="{{ $name }}" type="file" accept="{{ join(",", $accept) }}">
            <span class="file-upload-area__text">Загрузить аудио</span>
            <div class="file-upload-area__audio-info hide">
                <h4 class="file-upload-area__audio-name"></h4>
                <h5 class="file-upload-area__audio-size"></h5>
            </div>
            <x-loader />
        </label>
    @endif
</div>