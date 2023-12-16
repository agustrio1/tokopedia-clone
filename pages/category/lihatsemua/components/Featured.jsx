import React from "react";

const imageSources = [
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/d85c9b44-193a-4b60-ac0b-34d8cf668abe.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/3c3902b5-b6d3-44a0-a60a-7dc070cf2a56.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/4e5e531d-d74e-4f4c-835d-db0a7b6bd720.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/9/7/6f1e9e0b-c8df-4aa7-b087-ad2ca11dec57.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/7/25/50c4542e-561e-4ecf-8636-687f1fbe3f16.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2022/1/10/7d13af89-4e5b-4b03-b73a-a9cd8878bcac.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2022/5/25/3bde8596-10c7-42c5-bc27-5c08fedaccd0.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/11/22/89a828b4-0d52-4778-8426-b7b9279731d2.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2022/4/26/97b70c81-f290-45c9-838b-031635a23442.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/9/7/390a1bc2-21f3-4a0a-a7c2-cdea6e4882a6.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2022/4/28/050ba0c1-8f23-46bd-a0e5-8c2d4467c7ec.png?ect=4g",
];

const textSource = [
    'Handphone & Tablet',
    'Gaming',
    'Elektronik',
    'Promo',
    'Gopay Pinjam',
    'Pulsa',
    'Tokopedia Card',
    'Tokopedia Gift Card',
    'Uang Elektronik',
    'Dilayani Tokopedia',
    'Tokopedia Sehat',
]

const Featured = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {imageSources.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Featured Image ${index + 1}`}  className="w-8 h-8 mx-3"/>
          <p className="w-16 text-center text-[11px] mt-2">{textSource[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default Featured;