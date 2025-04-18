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
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .header {
        display: flex;
        align-items: center;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* NEW */
        padding: 20px;
        width: 100%;
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
        display: flex;
        justify-content: center;
        /* changed */
        align-items: center;
        /* NEW */
        padding: 40px;
        flex-wrap: wrap;
        gap: 40px;
        /* NEW: tạo khoảng cách đều đẹp hơn */
        text-align: left;
    }

    .main img {
        max-width: 500px;
        height: auto;
    }

    .content {
        max-width: 600px;
        font-size: 18px;
        line-height: 1.6;
        max-width: 600px;
        font-size: 18px;
        line-height: 1.6;
        padding: 10px;
        /* NEW */
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
        display: flex;
        /* NEW */
        flex-direction: column;
        /* NEW */
        align-items: center;
        /* NEW */
        width: 100%;
        height: 100%
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

    <a href="/login" class="login-button">Đăng nhập</a>


    <div class="header">
        <img src='http://nhom1ca2.me/assets/images/logo-small.png' alt="Logo" class="logo">
        <div class="title-section">
            <h2>Đăng ký Học phần</h2>
            <p>Nhóm 1 Ca 2 - 64HTTT2 - Nhập môn Điện toán Đám mây</p>
        </div>
    </div>

    <div class="main">
        <img src='http://nhom1ca2.me/assets/images/Homepage+graphic.png' alt="Hình minh họa học phần">
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

<link rel="stylesheet"
    href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css">
<script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
<df-messenger project-id="dtdm-nhom1ca2" agent-id="9eef82d4-e33c-44ba-9eaf-35ac482db05f" language-code="en"
    max-query-length="-1">
    <df-messenger-chat-bubble chat-title="Hi Chatbot">
    </df-messenger-chat-bubble>
</df-messenger>
<style>
df-messenger {
    z-index: 999;
    position: fixed;
    --df-messenger-font-color: #000;
    --df-messenger-font-family: Google Sans;
    --df-messenger-chat-background: #f3f6fc;
    --df-messenger-message-user-background: #d3e3fd;
    --df-messenger-message-bot-background: #fff;
    bottom: 16px;
    right: 16px;
}
</style>

</html>