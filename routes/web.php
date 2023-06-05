<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::prefix("auth")->group(function () {
    Route::view("/login", "auth.login");
    Route::view("/registration", "auth.registration");
});