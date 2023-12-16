import React from "react";

const imageSources = [
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/a0503795-0cb0-493e-afb3-81fab2a86d18.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/a2c041aa-85d3-4c61-9f82-82c9a9ff4a7a.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/62bee279-a30a-4931-bc1b-73705714ad2f.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/4/4/cce4e36e-4006-4c1f-bcba-1a4a2aa65688.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/c0761963-5b1c-45e0-b360-e36e120184af.png?ect=4g",
];

const textSource = [
  "Dapur",
  "Office & Stationery",
  "Pertukangan",
  "Properti",
  "Rumah",
];

const Perlengkapan = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {imageSources.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`Featured Image ${index + 1}`}
            className="w-8 h-8 mx-3"
          />
          <p className="w-16 text-center text-[11px] mt-2">
            {textSource[index]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Perlengkapan;