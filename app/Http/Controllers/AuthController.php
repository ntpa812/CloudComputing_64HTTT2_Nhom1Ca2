<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login'); // login.blade.php
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        // Danh sách tài khoản sinh viên cứng
        $students = [
            'a@student.com' => '12345678',
            'b@student.com' => '12345678',
            'c@student.com' => '12345678',
            'd@student.com' => '12345678',
            'e@student.com' => '12345678',
        ];

        // Tài khoản admin cứng (nếu có)
        $admin = [
            'admin@admin.com' => 'admin123',
        ];

        if (isset($students[$email]) && $students[$email] === $password) {
            session(['user_type' => 'student', 'email' => $email]);
            return redirect()->away('http://34.46.15.163/?page_id=90'); // trang WordPress
        }

        if (isset($admin[$email]) && $admin[$email] === $password) {
            session(['user_type' => 'admin', 'email' => $email]);
            return redirect()->away('http://34.46.15.163/?page_id=96&preview=true'); // link Zoho Creator
        }

        return redirect()->back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng.']);
    }

    public function logout()
    {
        session()->flush();
        return redirect('/login');
    }
}