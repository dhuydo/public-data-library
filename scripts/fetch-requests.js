async function fetchRequests() {
    const response = await fetch('https://api.airtable.com/v0/app1234567/Requests', {
        headers: {
            Authorization: 'Bearer YOUR_AIRTABLE_API_KEY'
        }
    });
    const data = await response.json();
    const list = document.getElementById('requestList');
    list.innerHTML = data.records.map(r => `
        <li><strong>${r.fields["Tên/Nickname"]}:</strong> ${r.fields["Mô tả chi tiết"]}</li>
    `).join('');
}
window.onload = fetchRequests;
