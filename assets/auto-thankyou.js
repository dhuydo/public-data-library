function sendThankYouEmail(record) {
    const nickname = record["Tên/Nickname"];
    const email = record["Email"];
    if (!email) return;

    const subject = `[OpenDataX] Cảm ơn bạn đã đóng góp dữ liệu`;
    const body = `
        <p>Xin chào <strong>${nickname}</strong>,</p>
        <p>Cảm ơn bạn đã gửi yêu cầu hoặc đóng góp dữ liệu mới tới OpenDataX.</p>
        <p><a href="https://opendatax.github.io/public-data-library/">Xem thư viện dữ liệu</a></p>
        <p>Follow thêm tại:</p>
        <ul>
            <li><a href="https://tiktok.com/@opendatax">TikTok</a></li>
            <li><a href="https://opendatax.substack.com">Substack</a></li>
        </ul>
        <p>Team OpenDataX 💙</p>
    `;
    GmailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: body,
        name: "OpenDataX",
        from: "opendatax@gmail.com"
    });
}

function processWebhook(e) {
    const data = JSON.parse(e.postData.contents);
    sendThankYouEmail(data.fields);
}
