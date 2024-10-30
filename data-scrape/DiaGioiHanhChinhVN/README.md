## Địa giới hành chính Việt Nam (Update: 26/10/2024)
 Script tự động tải file excel từ website tổng cục thống kê https://danhmuchanhchinh.gso.gov.vn/Default.aspx và chuyển sang dạng cây json.

 Chạy ```node index.js``` để update dữ liệu mới.

  - Tỉnh: Danh sách các tỉnh(tp trực thuộc trung ương) là 1 array, mỗi [phần tử] là object chứa:
    + Id
    + Name
    + Districts: Danh sách các huyện(phường, tp trực thuộc tỉnh) là 1 array, mỗi phần tử là một object chứa:
        + Id
        + Name
        + Wards: Danh sách các xã (phường, thị trấn) là 1 array, mỗi phần tử là một object chứa:
          + Id
          + Name
          + Level (Cấp hành chính phường,xã,thị trấn)


 Id không phải luôn tự tăng. Một số Id không tồn tại, vd: 03, 05

```
[
    {
        "Id": "01",
        "Name": "Thành phố Hà Nội",
        "Districts": [
            {
                "Id": "001",
                "Name": "Quận Ba Đình",
                "Wards": [
                    {
                        "Id": "00001",
                        "Name": "Phường Phúc Xá",
                        "Level": "Phường"
                    },
                    ...
                ]
            }
        ]
    },
    {
        "Id": "02",
        "Name": "Tỉnh Hà Giang",
        "Districts": []
    }
]
```