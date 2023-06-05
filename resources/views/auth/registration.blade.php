<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include("../includes/meta")
    @include("../includes/style")
    <title>Регистрация</title>
</head>
<body>
	<span class="hide">
		<x-alert :success="true" :message="'A simple success alert - check it out!'" />
	</span>
    <div class="auth">
        <div class="container">
            <div class="auth__inner">
                <h2 class="title">Регистрация</h2>
                <form class="form" id="registration-form" autocomplete="off">
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
                                    <x-custom-radio id="man" name="gender" text="Мужской" :checked="true" />
                                    <x-custom-radio id="woman" name="gender" text="Женский" />
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
            </div>
        </div>
    </div>
    @include("../includes/script")
</body>
</html>