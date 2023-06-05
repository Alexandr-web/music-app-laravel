<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include("../includes/meta")
    @include("../includes/style")
    <title>Вход</title>
</head>
<body>
	<x-alert :success="false" :message="'A simple success alert - check it out!'" />
    <div class="auth">
        <div class="container">
            <div class="auth__inner">
                <h2 class="title">Вход</h2>
                <form class="form" id="login-form" autocomplete="off">
                    <div class="form__inner">
                        <div class="form__field">
                            <label class="form__label" for="nickname">Никнейм</label>
                            <div class="form__input-block">
                                <input class="form__input" id="nickname" name="nickname" type="text" placeholder="Написать никнейм">
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
                        <input class="btn form__submit" type="submit" value="Войти">
                    </div>
                    <div class="form__addition">
                        <p class="form__addition-desc">
                            Нет аккаунта?
                            <a class="link" href="/auth/registration">Зарегистрироваться</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @include("../includes/script")
</body>
</html>