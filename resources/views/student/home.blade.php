@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Danh sách học phần</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Mã học phần</th>
                <th>Tên học phần</th>
                <th>Số tín chỉ</th>
                <th>Đăng ký</th>
            </tr>
        </thead>
        <tbody>
            @foreach($courses as $course)
            <tr>
                <td>{{ $course->course_code }}</td>
                <td>{{ $course->course_name }}</td>
                <td>{{ $course->credits }}</td>
                <td><button class="btn btn-primary">Đăng ký</button></td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection