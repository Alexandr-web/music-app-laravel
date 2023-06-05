<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/user', function () {
    $user = User::all();

    return response($user, 200)
        ->header('Content-Type', 'application/json');
});