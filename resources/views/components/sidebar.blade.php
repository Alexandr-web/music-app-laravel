<?php
    $navigation = [
        'home' => ['path' => '/', 'name' => 'Главная'],
        'audio' => ['path' => "/user/$userId?tab=audio", 'name' => 'Моя музыка'],
        'add-audio' => ['path' => '/audio/add', 'name' => 'Загрузить песню'],
        'add-playlist' => ['path' => '/playlist/add', 'name' => 'Создать плейлист'],
        'logout' => ['path' => '/logout', 'name' => 'Выйти'],
    ];
?>

<aside class="sidebar">
    <div class="sidebar__inner">
        <nav class="sidebar__nav">
            <ul class="sidebar__list">
                @foreach ($navigation as $key => $opt)
                    <li class="sidebar__list-item">
                        <a 
                            class="sidebar__list-link link-anim" 
                            href="{{ $opt['path'] }}"
                        >{{ $opt['name'] }}</a>
                    </li>
                @endforeach
            </ul>
        </nav>
    </div>
</aside>