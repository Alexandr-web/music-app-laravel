<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login')->middleware('redirect_if_token_exist');
    Route::view('/registration', 'auth.registration')->middleware('redirect_if_token_exist');

	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/registration', [AuthController::class, "registration"]);
});

Route::view('/', 'index')->middleware('redirect_if_token_not_exist');
Route::view('/music', 'music')->middleware('redirect_if_token_not_exist');
Route::view('/logout', 'logout')->middleware('redirect_if_token_not_exist');