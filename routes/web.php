<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginAPIController;

// Route::post('/api/login', [LoginAPIController::class, 'login']);
// Route::get('/api/courses', [CourseController::class, 'index']); // example


Route::get('/', function () {
    return view('student_home'); // View tĩnh demo
});