<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Trang chủ sinh viên</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        padding: 40px;
        background-color: #f4f4f4;
        text-align: center;
    }

    .container {
        background: white;
        padding: 30px;
        border-radius: 8px;
        display: inline-block;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    a.button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
    }
    </style>
</head>

<body>
    <div class="container">
        <h1>Chào mừng sinh viên đến với hệ thống!</h1>
        <p>Đây là trang demo tạm thời.</p>
        <a href="/login" class="button">Đăng nhập</a>
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