import React from "react";
import Image from "next/image";

const imageSources = [
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/3c3902b5-b6d3-44a0-a60a-7dc070cf2a56.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/a26b345d-d0be-425c-8800-7b2670ef4dd7.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/b8c3206e-403b-4cce-adbc-c11e7ca8044a.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/3c3902b5-b6d3-44a0-a60a-7dc070cf2a56.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/29940ba1-47f0-4522-b243-d3736c5f3c35.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/8be446d3-f30c-4a02-978a-d2794eddd8c3.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/b2c989c3-659c-4136-8db1-789f3268d2f7.png?ect=4g",
  "https://images.tokopedia.net/img/MIPuRC/2023/6/20/21cdb82a-08a7-430e-888e-ece125805b2e.png?ect=4g",
  "https://images.tokopedia.net/img/cache/50-square/MIPuRC/2021/6/2/3e641352-313b-4560-ac5f-1ec26156e986.png?ect=4g",
];

const textSource = [
  "Gaming",
  "Olahraga",
  "Mainan & Hobi",
  "Buku",
  "Film & Musik",
  "Logam Mulia",
  "Otomotif",
  "Perlengkapan Pesta",
  "Tour & Travel",
];

const Game = () => {
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

export default Game;
