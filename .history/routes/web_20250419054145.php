<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use Illuminate\Http\Request; // Thêm dòng này để sử dụng Request
use App\Http\Controllers\LoginAPIController;

// Route gốc sẽ trả về view chào mừng hoặc trang login
Route::get('/', function () {
    return view('welcome'); // View tĩnh demo
});

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

// Route cho sinh viên, chuyển hướng tới trang sinh viên của WordPress
Route::middleware('auth')->get('/sinhvien', function () {    // Redirect tới trang sinh viên trong WordPress
    return redirect('http://nhom1ca2.me/sinhvien'); // Đổi theo đường dẫn của trang sinh viên trong WordPress
});

// Route cho admin, chuyển hướng tới trang quản trị viên của Zoho Creator
Route::get('/admin', function () {
    // Redirect tới trang Zoho Creator cho admin
    return redirect('https://creator.zoho.com'); // Đổi theo URL Zoho Creator của bạn
});