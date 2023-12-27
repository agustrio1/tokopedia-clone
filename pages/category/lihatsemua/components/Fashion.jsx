import React from "react";
import Image from "next/image";

const imageSources = [
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/6fe7ae80-a126-4983-b825-750c1fa2cbd5.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/31b61527-7d23-4254-a256-a7f32b224cea.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/a6861bb8-ce4e-4179-96b4-ecede430ac98.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/4f365005-d631-4c0f-a8a7-fe59ce153e4c.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/28a4903d-7f22-40ac-b7ed-6c1ea4bfe5b4.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/1cb11dfc-c5bc-4c6b-8504-079ec7576a68.png?ect=4g",
];

const textSource = [
  "Fashion Pria",
  "Perawatan Tubuh",
  "Fashion Anak & bayi",
  "Fashion Muslimah",
  "Fashion Wanita",
  "Kecantikan",
];

const Fashion = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {imageSources.map((src, index) => (
        <div key={index}>
          <Image
            src={src}
            alt={`Featured Image ${index + 1}`}
            width={32}
            height={32}
            className="mx-3"
          />
          <p className="w-16 text-center text-[11px] mt-2">
            {textSource[index]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Fashion;
