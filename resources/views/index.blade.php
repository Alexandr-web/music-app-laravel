<?php
$songs = [
    1 => [
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
    ],
    [
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
    ],
    [
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
    ],
    [
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
    ],
    [
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
],
[
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
],
[
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
],
[
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
],
[
        'name' => 'Bleach',
        'singer' => '$uicideboy$',
        'time' => '01:31',
        'poster' => 'https://images.genius.com/f4070376322053f8aee83f60c88710cb.1000x1000x1.png'
    ]
];
?>

@extends('layouts.main')

@section('title', 'Главная')

@section('content')
    <h1 class="title sticky-title">Главная</h1>
    <div class="main-content__container">
        <x-table-song :songs="$songs" />
    </div>
@endsection