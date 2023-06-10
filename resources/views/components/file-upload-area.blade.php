<div class="file-upload-area">
    @if ($isAvatar)
        <label class="file-upload-area__avatar" for="{{ $id }}">
            <input class="file-upload-area__input" id="{{ $id }}" name="{{ $name }}" type="file" accept="{{ join(",", $accept) }}">
            <span class="file-upload-area__text {{ $defaultSrc ? 'hide' : '' }}">Загрузить фотографию</span>
            <img class="file-upload-area__avatar-img {{ $defaultSrc ? '' : 'hide' }}" src="{{ $defaultSrc ?? '' }}" alt="Аватар пользователя">
			<x-loader />
        </label>
    @endif
</div>