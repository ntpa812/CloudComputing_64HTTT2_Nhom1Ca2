<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course; // Giả sử bạn có một model Course tương ứng với bảng courses trong Cloud SQL.

class CourseController extends Controller
{
    public function getCourses()
    {
        $courses = Course::all();  // Lấy tất cả các khóa học từ Cloud SQL
        return response()->json($courses);  // Trả về dữ liệu dưới dạng JSON
    }
}