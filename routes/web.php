<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login');
    Route::view('/registration', 'auth.registration');
});

Route::view('/', 'index');
Route::view('/music', 'music');
Route::view('/logout', 'logout');