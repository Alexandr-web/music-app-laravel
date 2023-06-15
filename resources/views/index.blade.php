@extends('layouts.main')

@section('title', 'Главная')

@section('content')
    <h1 class="title sticky-title">Главная</h1>
    <div class="main-content__container">
        @if (count([]))
            <x-table-song :songs="[]" playlistId="home" />
        @else
            <x-nothing-find text="Ничего нет" />
        @endif
    </div>
@endsection