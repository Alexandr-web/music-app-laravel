<?php
$playlists = [
    [
            'id' => 1,
            'name' => 'Мой плейлист',
            'poster' => 'https://cdn.ananasposter.ru/image/cache/catalog/poster/music/80/23716-1000x830.jpg'
    ],
    [
            'id' => 1,
            'name' => 'Мой плейлист',
            'poster' => 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9eff4f57644341.59ddf57b73b7a.png'
    ],
];
?>

@extends('layouts.main')

@section('title', 'Профиль '.$user->nickname)

@section('content')
    <x-alert />
    <div class="profile">
        <div class="profile__inner">
            <div class="profile__block profile__controls">
                <x-profile-sidebar :user="$user" :isGuest="$is_guest" :tab="$active_tab" />
            </div>
            <div class="profile__block profile__content">
                <div class="container">
                    @switch($active_tab)
                        @case("favorites")
                            <x-profile-tab-favorites :favorites="[]" />
                            @break
                        @case("playlists")
                            <x-profile-tab-playlists :playlists="$playlists" />
                            @break
                        @case("settings")
                            <x-profile-tab-settings :user="$user" />
                            @break
                        @default
                            <x-profile-tab-audio :audio="$audio" />
                    @endswitch
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    @vite(['resources/js/pages/user/index'])
@endsection