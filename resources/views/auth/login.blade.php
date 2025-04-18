<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng nhập</title>
    <style>
    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(to right, #d1e9f9, #a0d8f1);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .login-container {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    .login-container h2 {
        margin-bottom: 30px;
        color: #333;
    }

    .login-container input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-size: 16px;
    }

    .login-container button {
        width: 100%;
        padding: 12px;
        background-color: #007bff;
        border: none;
        color: white;
        font-size: 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .login-container button:hover {
        background-color: #0056b3;
    }

    .login-container p {
        margin-top: 15px;
        font-size: 14px;
        color: #777;
    }
    </style>
</head>

<body>

    <div class="login-container">
        <h2>Đăng nhập hệ thống</h2>
        <form action="{{ route('login') }}" method="POST">
            <input type="email" name="email" placeholder="Email sinh viên" required>
            <input type="password" name="password" placeholder="Mật khẩu" required>
            <button type="submit">Đăng nhập</button>
        </form>
        <p>© Nhóm 1 Ca 2 - 64HTTT2</p>
    </div>

</body>

</html>