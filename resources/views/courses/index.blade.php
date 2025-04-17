<!DOCTYPE html>
<html>

<head>
    <title>Danh sách học phần</title>
</head>

<body>
    <h1>Danh sách học phần</h1>

    @if(session('success'))
    <div style="color: green;">{{ session('success') }}</div>
    @elseif(session('error'))
    <div style="color: red;">{{ session('error') }}</div>
    @endif

    <ul>
        @foreach($courses as $course)
        <li>
            {{ $course->name }}
            <form method="POST" action="{{ route('courses.register') }}">
                @csrf
                <input type="hidden" name="course_id" value="{{ $course->id }}">
                <button type="submit">Đăng ký</button>
            </form>
        </li>
        @endforeach
    </ul>
</body>

</html>