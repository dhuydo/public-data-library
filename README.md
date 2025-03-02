# OpenDataX - Public Data Library

## 📖 Giới thiệu
Nền tảng thư viện dữ liệu mở, phục vụ cộng đồng Việt Nam.

## 📂 Cấu trúc thư mục
- `index.html`: Trang chính
- `contribute.html`: Trang đóng góp dữ liệu
- `requests.html`: Yêu cầu từ cộng đồng
- `data/`: Chứa file CSV/Excel
- `assets/css/style.css`: Style trang

## 🛠️ Hướng dẫn update dữ liệu mới
1. Thêm file CSV vào thư mục `data/`
2. Mở `index.html`, thêm 1 dòng mới trong `<tbody>`:
    ```html
    <tr>
        <td>Tên Dataset</td>
        <td>Mô tả</td>
        <td>Người đóng góp</td>
        <td><a href="data/tên-file.csv" download>Tải về</a></td>
    </tr>
    ```
3. Commit & push lên GitHub.

## 📬 Đóng góp dữ liệu
Gửi qua Google Form [tại đây](https://forms.gle/8qR6oD4w8WLPZ7Lx9)

---

💡 **Muốn mình gom nguyên folder này thành file ZIP rồi gửi luôn cho dễ không?**
Hay bạn thích copy từng file?

👉 Xác nhận cái nào tiện thì mình gửi! 🔥
