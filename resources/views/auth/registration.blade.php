@extends('layouts.auth')

@section('title', 'Регистрация')

@section('content')
    <h2 class="title">Регистрация</h2>
    <form class="form" id="registration-form" autocomplete="off" enctype="multipart/form-data">
        <div class="form__inner">
            <div class="form__field">
                <label class="form__label" for="avatar">Аватар</label>
                <div class="form__input-block">
                    <x-file-upload-area id="avatar" name="avatar" :isAvatar="true" :accept="['image/*']" />
                </div>
            </div>
            <div class="form__field">
                <label class="form__label" for="nickname">Никнейм</label>
                <div class="form__input-block">
                    <input class="form__input" id="nickname" name="nickname" type="text" placeholder="Написать никнейм">
                </div>
            </div>
            <div class="form__field">
                <label class="form__label" for="email">Эл. почта</label>
                <div class="form__input-block">
                    <input class="form__input" id="email" name="email" type="text" placeholder="Написать эл. почту">
                </div>
            </div>
            <div class="form__field">
                <label class="form__label" for="password">Пароль</label>
                <div class="form__input-area">
                    <div class="form__input-block">
                        <input class="form__input" id="password" name="password" type="password" placeholder="Написать пароль">
                    </div>
                    <div class="form__input-controls">
                        <button class="btn form__input-controls-btn" id="controls-btn-password" type="button">
                            <x-eye-closed-icon :show="true" />
                            <x-eye-open-icon />
                        </button>
                    </div>
                </div>
            </div>
            <div class="form__field">
                <label class="form__label" for="man">Пол</label>
                <div class="form__input-area">
                    <div class="form__input-block">
                        <x-custom-radio id="man" name="gender" text="Мужской" :checked="true" value="man" />
                        <x-custom-radio id="woman" name="gender" text="Женский" value="woman" />
                    </div>
                </div>
            </div>
            <input class="btn form__submit" type="submit" value="Зарегистрироваться">
        </div>
        <div class="form__addition">
            <p class="form__addition-desc">
                Есть аккаунт?
                <a class="link" href="/auth/login">Войти</a>
            </p>
        </div>
    </form>
@endsection

@section('scripts')
    @vite(["resources/js/pages/auth/registration"])
@endsection