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
<body class="default-page">
    <div class="wrapper">
        <div class="wrapper__inner">
            <div class="wrapper__top">
                <div class="wrapper__block wrapper__block-left">
                    <x-sidebar :userId="$current_user['id']" />
                </div>
                <div class="wrapper__block wrapper__block-right">
                    <x-header :user="$current_user" />
                    <main class="main-content">
                        @yield('content')
                    </main>
                </div>
            </div>
            <div class="wrapper__bottom">
                <x-audio-player />
            </div>
        </div>
    </div>
    @yield('scripts')
</body>
</html>