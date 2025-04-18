<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginAPIController;

// Route::post('/api/login', [LoginAPIController::class, 'login']);
// Route::get('/api/courses', [CourseController::class, 'index']); // example


Route::get('/', function () {
    return view('welcome'); // View tĩnh demo
});

Route::post('/login', function (Request $request) {
    // Xác thực người dùng qua Zoho Creator API hoặc một dịch vụ khác

    $email = $request->input('email');
    $password = $request->input('password');
    
    // Giả sử bạn kiểm tra email và mật khẩu với Zoho Creator hoặc một hệ thống khác
    $userType = checkUserCredentials($email, $password);

    if ($userType == 'student') {
        return redirect('/sinhvien'); // Truy cập vào trang sinh viên (WordPress)
    } elseif ($userType == 'admin') {
        return redirect('/admin'); // Truy cập vào trang quản trị viên (Zoho Creator)
    } else {
        return redirect()->back()->withErrors(['msg' => 'Sai thông tin đăng nhập']);
    }
})->name('login');



Route::get('/sinhvien', function () {
    // Bạn có thể hiển thị trang WordPress hoặc API của WordPress cho sinh viên
    return redirect('http://nhom1ca2.me/sinhvien'); // Đổi theo đường dẫn của trang sinh viên trong WordPress
});


Route::get('/admin', function () {
    // Bạn có thể hiển thị trang Zoho Creator hoặc API của Zoho Creator cho admin
    return redirect('https://creator.zoho.com'); // Đổi theo URL Zoho Creator của bạn
});