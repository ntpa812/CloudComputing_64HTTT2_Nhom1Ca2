<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; // Thêm dòng này để sử dụng Request
use App\Http\Controllers\LoginAPIController;

// Route gốc sẽ trả về view chào mừng hoặc trang login
Route::get('/', function () {
    return view('welcome'); // View tĩnh demo
});

// Route xử lý login với POST request
Route::post('/login', function (Request $request) {
    // Xác thực người dùng qua Zoho Creator API hoặc một dịch vụ khác

    $email = $request->input('email');
    $password = $request->input('password');
    
    // Giả sử bạn kiểm tra email và mật khẩu với Zoho Creator hoặc một hệ thống khác
    $userType = checkUserCredentials($email, $password); // Thực hiện kiểm tra đăng nhập tại đây

    if ($userType == 'student') {
        return redirect('/sinhvien'); // Truy cập vào trang sinh viên (WordPress)
    } elseif ($userType == 'admin') {
        return redirect('/admin'); // Truy cập vào trang quản trị viên (Zoho Creator)
    } else {
        return redirect()->back()->withErrors(['msg' => 'Sai thông tin đăng nhập']);
    }
})->name('login');

// Route cho sinh viên, chuyển hướng tới trang sinh viên của WordPress
Route::get('/sinhvien', function () {
    // Redirect tới trang sinh viên trong WordPress
    return redirect('http://nhom1ca2.me/sinhvien'); // Đổi theo đường dẫn của trang sinh viên trong WordPress
});

// Route cho admin, chuyển hướng tới trang quản trị viên của Zoho Creator
Route::get('/admin', function () {
    // Redirect tới trang Zoho Creator cho admin
    return redirect('https://creator.zoho.com'); // Đổi theo URL Zoho Creator của bạn
});