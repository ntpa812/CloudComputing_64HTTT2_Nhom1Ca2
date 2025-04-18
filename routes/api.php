<?php 

// routes/api.php
use App\Models\Course;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

Route::get('/courses', function () {
    return response()->json(Course::all());
});