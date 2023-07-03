@extends('layouts.main')

@section('title', 'Создание плейлиста')

@section('content')
    <x-alert />
    <h1 class="title sticky-title">Создание плейлиста</h1>
    <div class="main-content__container">
        <form class="form" autocomplete="off" id="add-playlist-form" enctype="multipart/form-data">
            <div class="form__inner">
                <div class="form__field">
                    <label class="form__label" for="poster">Постер</label>
                    <div class="form__input-block">
                        <x-file-upload-area id="poster" name="poster" :isPoster="true" :accept="['.png', '.jpg', '.jpeg', '.svg']" />
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="name">Название</label>
                    <div class="form__input-block">
                        <input class="form__input" id="name" name="name" type="text" placeholder="Написать название">
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="audio">Добавление аудио</label>
                    <div class="form__input-block">
                        <input class="form__input" id="audio" name="audio" type="text" placeholder="Написать название аудио">
                    </div>
                    <div class="form__search-result form__search-result--flex">
                        <div class="form__search-result-block">
                            <h4 class="title form__search-result-title">Результат поиска</h4>
                            <x-nothing-find text="Ничего не найдено" id="search-nothing" />
                            <ul class="form__search-result-list" id="search-audio-result-list"></ul>
                        </div>
                        <div class="form__search-result-block">
                            <h4 class="title form__search-result-title">Добавленные песни</h4>
                            <x-nothing-find text="Ничего нет" id="added-nothing" />
                            <ul class="form__search-result-list" id="added-audio-list"></ul>
                        </div>
                    </div>
                </div>
                <input class="btn form__submit" type="submit" value="Создать">
            </div>
        </form>
    </div>
@endsection