<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('../includes/meta')
    @include('../includes/style')
    <title>@yield('title')</title>
</head>
<body>
    <x-alert />
    <div class="auth">
        <div class="container">
            <div class="auth__inner">
                @yield('content')
            </div>
        </div>
    </div>
    @yield('scripts')
    @vite(["resources/js/pages/auth/index"])
</body>
</html>