<?php

use Illuminate\Support\Facades\Route;

Route::prefix("auth")->group(function () {
    Route::view("/login", "auth.login");
    Route::view("/registration", "auth.registration");
});