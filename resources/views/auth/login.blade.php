<?php
    $data = [
        "nickname" => [
            "label" => "Никнейм",
            "type" => "text",
            "placeholder" => "Введите ваш никнейм",
            "name" => "nickname",
            "id" => "login-nickname"
        ],
        "password" => [
            "label" => "Пароль",
            "type" => "password",
            "placeholder" => "Введите ваш пароль",
            "name" => "password",
            "id" => "login-password"
        ]
    ];
?>

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
    @include("../includes/script")
</body>
</html>