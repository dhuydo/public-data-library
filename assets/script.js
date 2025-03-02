/* public-data-library/assets/script.js */
const SUPABASE_URL = 'https://wkavojbmdhakvpwrqcot.supabase.co';  // Thay bằng link thật
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYXZvamJtZGhha3Zwd3JxY290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4ODg1MjMsImV4cCI6MjA1NjQ2NDUyM30.APuSUo6Nl0RPTM2fwFaE_9YMwlo75f8ywd3VCYWaYLY';  // Thay bằng key thật

// Xử lý gửi form
if (document.getElementById('requestForm')) {
    document.getElementById('requestForm').onsubmit = async function (e) {
        e.preventDefault();
        const nickname = document.getElementById('nickname').value;
        const email = document.getElementById('email').value;
        const description = document.getElementById('description').value;
        const file = document.getElementById('file').files[0];
        let fileUrl = '';

        if (file) {
            const fileExt = file.name.split('.').pop();
            const filePath = `requests/${Date.now()}_${nickname}.${fileExt}`;
            const { data, error } = await uploadFile(filePath, file);
            if (error) {
                document.getElementById('statusMessage').innerText = 'Lỗi upload file!';
                return;
            }
            fileUrl = `${SUPABASE_URL}/storage/v1/object/public/${data.path}`;
        }

        const payload = { nickname, email, description, file_url: fileUrl };
        const response = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('statusMessage').innerText = 'Yêu cầu đã gửi thành công!';
        } else {
            document.getElementById('statusMessage').innerText = 'Lỗi gửi yêu cầu!';
        }
    };
}

// Hiển thị danh sách yêu cầu
if (document.getElementById('requestsTable')) {
    (async () => {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/requests?select=*`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const requests = await response.json();
        const tbody = document.querySelector('#requestsTable tbody');
        requests.forEach(req => {
            const row = `<tr>
                <td>${req.nickname}</td>
                <td>${req.description}</td>
                <td>${new Date(req.created_at).toLocaleString()}</td>
                <td>${req.file_url ? `<a href="${req.file_url}" target="_blank">Tải file</a>` : 'Không có file'}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    })();
}

async function uploadFile(path, file) {
    const url = `${SUPABASE_URL}/storage/v1/object/${path}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
        body: file
    });
    if (!response.ok) return { error: true };
    return { data: { path } };
}
