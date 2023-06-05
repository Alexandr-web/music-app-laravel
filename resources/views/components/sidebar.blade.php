<?php
    $navigation = [
        'home' => ['path' => '/', 'name' => 'Главная'],
        'music' => ['path' => '/music', 'name' => 'Моя музыка'],
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
                            class="sidebar__list-link" 
                            href="{{ $opt['path'] }}"
                        >{{ $opt['name'] }}</a>
                    </li>
                @endforeach
            </ul>
        </nav>
    </div>
</aside>