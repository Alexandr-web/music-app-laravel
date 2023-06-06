<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login');
    Route::view('/registration', 'auth.registration');
	Route::post('/login', [UserController::class, 'login']);
	Route::post('/registration', [UserController::class, "registration"]);
});

Route::view('/', 'index');
Route::view('/music', 'music');
Route::view('/logout', 'logout');