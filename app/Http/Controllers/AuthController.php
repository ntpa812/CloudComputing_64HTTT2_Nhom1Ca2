<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login'); // Tạo file login.blade.php
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                return redirect()->away('https://creator.zoho.com/...'); // link Zoho Creator
            } else {
                return redirect()->away('https://nhom1ca2.me/sinhvien'); // link WordPress
            }
        }

        return back()->withErrors([
            'email' => 'Email hoặc mật khẩu không đúng.',
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}