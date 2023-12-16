import React from "react";

const imageSources = [
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/8a9fca14-7192-4a1e-b87a-214c22638352.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/41288619-fd5a-4c86-b8c6-1c3361c901fb.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/d2f80def-fbb5-4fab-ac1c-499f774687af.png?ect=4g ",
  "https://images.tokopedia.net/img/cache/50-square/MIPuRC/2021/5/28/d934b056-bbd8-49ab-b0d8-24608a6029a6.png?ect=4g",
];

const textSource = [
    'Kesehatan',
    'Makanan & Minuman',
    'Ibu & Bayi',
    'Perawatan Hewan'
]
const Kebutuhan = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {imageSources.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Featured Image ${index + 1}`}  className="w-8 h-8 mx-3"/>
          <p className="w-16 text-center text-[11px] mt-2">{textSource[index]}</p>
        </div>
      ))}
    </div>
  )
};

export default Kebutuhan;