<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AudioController;
use Illuminate\Http\Request;

Route::prefix('auth')->group(function () {
    Route::view('/login', 'auth.login')->middleware('redirect_if_token_exist');
    Route::view('/registration', 'auth.registration')->middleware('redirect_if_token_exist');

	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/registration', [AuthController::class, "registration"]);
});

Route::prefix('user')->group(function () {
    Route::get('/{id}', [UserController::class, 'profileRender'])
        ->middleware('redirect_if_token_not_exist')
        ->middleware('get_current_user_data')
        ->where('id', '[0-9]+');
});

Route::get('/', function (Request $request) {
    return view('index', ['current_user' => $request->user]);
})  
    ->middleware('redirect_if_token_not_exist')
    ->middleware('get_current_user_data');

Route::prefix('audio')->group(function () {
    Route::get('/add', function (Request $request) {
        return view('audio.add', ['current_user' => $request->user]);
    })  
        ->middleware('redirect_if_token_not_exist')
        ->middleware('get_current_user_data');

    Route::post('/upload', [AudioController::class, 'upload'])
        ->middleware('check_token');
});

Route::prefix('playlist')->group(function () {
    Route::get('/add', function (Request $request) {
        return view('playlist.add', ['current_user' => $request->user]);
    })  
        ->middleware('redirect_if_token_not_exist')
        ->middleware('get_current_user_data');

    Route::post('/upload', [PlaylistController::class, 'upload'])
        ->middleware('check_token');
});

Route::get('/logout', function (Request $request) {
    return view('logout', ['current_user' => $request->user]);
})
    ->middleware('redirect_if_token_not_exist')
    ->middleware('get_current_user_data');