<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login'); // hoặc dùng controller
})->name('login');

Route::get('/dashboard', function () {
    return view('homepage.home');
})->middleware('auth');