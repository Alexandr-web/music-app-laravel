<?php
    $nav_list_for_owner = [
        ['tab' => 'audio', 'name' => 'Аудио'],
        ['tab' => 'playlists', 'name' => 'Плейлисты'],
        ['tab' => 'favorites', 'name' => 'Избранное'],
        ['tab' => 'settings', 'name' => 'Настройки'],
    ];

    $nav_list_for_guest = [
        ['tab' => 'audio', 'name' => 'Аудио'],
        ['tab' => 'playlists', 'name' => 'Плейлисты'],
    ];

    $current_list = $isGuest ? $nav_list_for_guest : $nav_list_for_owner;
?>

<aside class="profile__sidebar">
    <div class="profile__sidebar-inner">
        <div class="profile__sidebar-block">
            <div class="profile__sidebar-avatar">
                <img class="profile__avatar" src="http://127.0.0.1:8000/storage/avatars/{{ $user->avatar }}" alt="Аватар пользователя">
            </div>
            <div class="profile__sidebar-info">
                <h3 class="profile__nickname">{{ $user->nickname }}</h3>
                <h4 class="profile__email">{{ $user->email }}</h4>
            </div>
        </div>
        <div class="profile__sidebar-block">
            <nav class="profile__sidebar-nav">
                <ul class="profile__sidebar-list">
                    @foreach ($current_list as $item)
                        <li class="profile__sidebar-list-item">
                            <a class="profile__sidebar-list-link link-anim {{ $tab === $item['tab'] ? 'link-anim--active' : '' }}" href="?tab={{ $item['tab'] }}">{{ $item['name'] }}</a>
                        </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>
</aside>