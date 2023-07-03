@extends('layouts.main')

@section('title', 'Загрузка аудио')

@section('content')
    <x-alert />
    <h1 class="title sticky-title">Загрузка аудио</h1>
    <div class="main-content__container">
        <form class="form" autocomplete="off" id="add-music-form" enctype="multipart/form-data">
            <div class="form__inner">
                <div class="form__field form__field-wrapper">
                    <div class="form__field-block form__field-block--20">
                        <label class="form__label" for="poster">Постер</label>
                        <div class="form__input-block">
                            <x-file-upload-area id="poster" name="poster" :isPoster="true" :accept="['.png', '.jpg', '.jpeg', '.svg']" />
                        </div>
                    </div>
                    <div class="form__field-block form__field-block--80">
                        <label class="form__label" for="audio">Аудио</label>
                        <div class="form__input-block">
                            <x-file-upload-area id="audio" name="audio" :isAudio="true" :accept="['.mpeg', '.mp3', '.flac']" />
                        </div>
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="name">Название</label>
                    <div class="form__input-block">
                        <input class="form__input" id="name" name="name" type="text" placeholder="Написать название">
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="singer">Исполнитель</label>
                    <div class="form__input-block">
                        <input class="form__input" id="singer" name="singer" type="text" placeholder="Написать исполнителя">
                    </div>
                </div>
                <input class="btn form__submit" type="submit" value="Загрузить">
            </div>
        </form>
    </div>
@endsection