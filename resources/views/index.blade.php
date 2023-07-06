@extends('layouts.main')

@section('title', 'Главная')

@section('content')
    <x-modal-window-playlist />
    <div class="welcome">
        <div class="welcome__inner">
            <div class="welcome__block welcome__block-top">
                <h1 class="title welcome__title">music app laravel</h1>
                <h2 class="title welcome__subtitle">Проект, построенный на PHP, Laravel, JavaScript, PostgreSQL, SCSS</h2>
            </div>
            <div class="welcome__block">
                <div class="container">
                    <div class="welcome__block-content">
                        <h2 class="title sticky-title">Плейлисты</h2>
                        @if (count($playlists))
                            <ul class="playlists">
                                @foreach ($playlists as $data)
                                    <li class="playlists__item">
                                        <x-custom-playlist :playlist="$data['playlist']" :ownerNickname="$data['owner_nickname']" />
                                    </li>
                                @endforeach
                            </ul>
                        @else
                            <x-nothing-find text="Ничего нет" />
                        @endif
                    </div>
                    <div class="welcome__block-content">
                        <h2 class="title sticky-title">Аудио</h2>
                        @if (count($audio))
                        <x-table-song :songs="$audio" playlistId="home" />
                        @else
                            <x-nothing-find text="Ничего нет" />
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection