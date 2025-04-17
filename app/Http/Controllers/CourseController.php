<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        return view('courses.index', compact('courses'));
    }

    public function register(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = auth()->user(); // hoặc User::find(1); nếu chưa có auth

        // Tránh đăng ký trùng
        if ($user->courses()->where('course_id', $request->course_id)->exists()) {
            return back()->with('error', 'Bạn đã đăng ký học phần này!');
        }

        $user->courses()->attach($request->course_id);

        return back()->with('success', 'Đăng ký thành công!');
    }
}