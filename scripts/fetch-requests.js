async function fetchRequests() {
    const response = await fetch('https://api.airtable.com/v0/appE9FY7u0IchK4bd/User%20Request', {
        headers: {
            Authorization: 'Bearer patHUkxTVbBvHCOM5.fe08a12c506dcf5f4f4d2a2e41992933060d952d981d8e046bd6fa4e02767d71'
        }
    });
    const data = await response.json();
    const list = document.getElementById('requestList');
    list.innerHTML = data.records.map(r => `
        <li><strong>${r.fields["Tên/Nickname"]}:</strong> ${r.fields["Mô tả chi tiết"]}</li>
    `).join('');
}
window.onload = fetchRequests;
