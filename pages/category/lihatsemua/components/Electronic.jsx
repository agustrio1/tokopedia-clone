import React from 'react';

const imageSources = [
  'https://images.tokopedia.net/img/MIPuRC/2023/6/20/d85c9b44-193a-4b60-ac0b-34d8cf668abe.png?ect=4g',
  'https://images.tokopedia.net/img/MIPuRC/2023/6/20/4e5e531d-d74e-4f4c-835d-db0a7b6bd720.png?ect=4g',
  'https://images.tokopedia.net/img/MIPuRC/2023/6/20/36aae699-56dc-41d0-9cb9-93ae49c377dd.png?ect=4g',
  'https://images.tokopedia.net/img/MIPuRC/2023/6/20/a573fd21-5126-4452-8579-04deea1817cb.png?ect=4g',
];

const textSource = [
  'Handphone & Tablet',
  'Elektronik',
  'Komputer & Laptop',
  'Audio, Kamera & Elektronik Lainnya',
];

const Electronic = () => {
  return (
    <div className="flex flex-row items-center gap-4">
      {imageSources.map((src, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={src} alt={`Featured Image ${index + 1}`} className="w-8 h-8 mx-3" />
          <p className="w-20 h-16 text-center text-[11px] mt-2">{textSource[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default Electronic;
