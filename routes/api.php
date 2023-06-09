<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AudioController;
use App\Http\Controllers\PlaylistController;

Route::get('user/{id}', [UserController::class, 'getOne'])->where('id', '[0-9]+');

Route::prefix('audio')->group(function () {
    Route::get('/{id}', [AudioController::class, 'getOne'])->where('id', '[0-9]+');
    Route::get('/', [AudioController::class, 'getAll'])
        ->middleware('check_token');
});

Route::prefix('playlist')->group(function () {
    Route::get('/{id}', [PlaylistController::class, 'getOne'])->where('id', '[0-9]+');
});