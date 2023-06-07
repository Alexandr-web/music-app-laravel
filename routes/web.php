<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login');
    Route::view('/registration', 'auth.registration');
	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/registration', [AuthController::class, "registration"]);
});

Route::view('/', 'index');
Route::view('/music', 'music');
Route::view('/logout', 'logout');