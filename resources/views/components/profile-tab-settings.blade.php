<?php
    $host = $_ENV['HOST'];
    $url_storage = "$host/storage/avatars/";
?>

<x-alert />
<div class="profile__tab">
    <div class="profile__tab-inner">
        <h1 class="title">Настройки</h1>
        <form class="form" autocomplete="off" id="edit-form" enctype="multipart/form-data">
            <div class="form__inner">
                <div class="form__field">
                    <label class="form__label" for="avatar">Аватар</label>
                    <div class="form__input-block">
                        <x-file-upload-area id="avatar" name="avatar" :isAvatar="true" :accept="['.png', '.jpg', '.jpeg', '.svg']" :defaultSrc="$url_storage.$user['avatar']" />
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="nickname">Никнейм</label>
                    <div class="form__input-block">
                        <input class="form__input" id="nickname" name="nickname" type="text" placeholder="Написать никнейм" value="{{ $user['nickname'] }}">
                    </div>
                </div>
                <div class="form__field">
                    <label class="form__label" for="email">Эл. почта</label>
                    <div class="form__input-block">
                        <input class="form__input" id="email" name="email" type="text" placeholder="Написать эл. почту" value="{{ $user['email'] }}">
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
                            <x-custom-radio id="man" name="gender" text="Мужской" :checked="$user['gender'] === 'man'" value="man" />
                            <x-custom-radio id="woman" name="gender" text="Женский" :checked="$user['gender'] === 'woman'" value="woman" />
                        </div>
                    </div>
                </div>
                <input class="btn form__submit" type="submit" value="Сохранить">
            </div>
        </form>
    </div>
</div>