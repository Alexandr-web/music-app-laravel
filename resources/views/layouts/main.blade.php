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
            <div class="wrapper__block wrapper__block-left">
                <x-sidebar />
            </div>
            <div class="wrapper__block wrapper__block-right">
                <x-header />
                <main class="main-content">
                    @yield('content')
                </main>
            </div>
        </div>
    </div>
    @include('../includes/script')
</body>
</html>