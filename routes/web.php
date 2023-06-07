<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login')->middleware('redirectIfTokenExist');
    Route::view('/registration', 'auth.registration')->middleware('redirectIfTokenExist');

	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/registration', [AuthController::class, "registration"]);
});

Route::view('/', 'index')->middleware('redirectIfTokenNotExist');
Route::view('/music', 'music')->middleware('redirectIfTokenNotExist');
Route::view('/logout', 'logout')->middleware('redirectIfTokenNotExist');