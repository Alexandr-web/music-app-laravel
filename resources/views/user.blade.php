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
                            <x-profile-tab-playlists :playlists="$playlists ?? []" />
                            @break
                        @case("settings")
                            <x-profile-tab-settings :user="$user" />
                            @break
                        @default
                            <x-profile-tab-audio :audio="$audio ?? []" />
                    @endswitch
                </div>
            </div>
        </div>
    </div>
@endsection