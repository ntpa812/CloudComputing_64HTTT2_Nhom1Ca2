<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng ký Học phần</title>
    <style>
    body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(to right, #c0e8f9, #9fdcf3);
        color: #000;
    }

    .header {
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .logo {
        width: 60px;
        margin-right: 15px;
    }

    .title-section {
        font-size: 18px;
    }

    .main {
        display: flex;
        justify-content: space-between;
        padding: 40px;
        flex-wrap: wrap;
    }

    .main img {
        max-width: 500px;
        height: auto;
    }

    .content {
        max-width: 600px;
        font-size: 18px;
        line-height: 1.6;
    }

    .login-button {
        position: absolute;
        top: 20px;
        right: 20px;
        background: black;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 16px;
        cursor: pointer;
    }

    .footer {
        background-color: black;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 16px;
    }

    .footer a {
        color: white;
        margin: 0 10px;
        text-decoration: none;
    }

    .footer a:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        .main {
            flex-direction: column;
            align-items: center;
        }
    }
    </style>
</head>

<body>

    <button class="login-button">Đăng nhập</button>

    <div class="header">
        <img src='public/assets/images/logo-small.png' alt="Logo" class="logo">
        <div class="title-section">
            <h2>Đăng ký Học phần</h2>
            <p>Nhóm 1 Ca 2 - 64HTTT2 - Nhập môn Điện toán Đám mây</p>
        </div>
    </div>

    <div class="main">
        <img src="public" alt="Hình minh họa học phần">
        <div class="content">
            <p>Hệ thống của chúng tôi được thiết kế để giúp bạn dễ dàng và nhanh chóng đăng ký các học phần trong mỗi kỳ
                học. Với giao diện thân thiện và dễ sử dụng, bạn có thể dễ dàng duyệt qua danh sách các khóa học, kiểm
                tra thông tin chi tiết, và thực hiện đăng ký chỉ trong vài bước đơn giản.</p>

            <p>Hãy đăng nhập vào tài khoản của bạn để bắt đầu đăng ký học phần ngay hôm nay và quản lý kế hoạch học tập
                hiệu quả. Nếu bạn là sinh viên, trang chủ của bạn sẽ cung cấp thông tin đầy đủ về các khóa học có sẵn và
                các học phần bạn đã đăng ký. Nếu bạn là quản trị viên, bạn có thể theo dõi và quản lý toàn bộ hệ thống
                đăng ký học phần.</p>

            <p>Chúc bạn một kỳ học thành công và hiệu quả!</p>
        </div>
    </div>

    <div class="footer">
        <p>Đăng ký học phần dành cho sinh viên</p>
        <div>
            Follow us:
            <a href="#">Facebook</a> |
            <a href="#">Instagram</a>
        </div>
    </div>

</body>

</html>