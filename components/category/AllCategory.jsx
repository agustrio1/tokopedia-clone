import Link from 'next/link';
import React from 'react';

const categories = [
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/11/09ec6803-7e1f-4be1-b438-f6b418b8d7a1.png',
    alt: 'LihatSemua',
    text: 'Lihat Semua',
    route: 'lihatsemua',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/11/41591e19-ce13-481c-aec7-0f94992bf3c6.png',
    alt: 'HandphoneTablet',
    text: 'Handphone & Tablet',
    route: 'handphone',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/12/f517b6a2-d45f-4844-948b-209fc677ffa9.png',
    alt: 'Elektronik',
    text: 'Elektronik',
    route: 'elektronik',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/12/3af27543-cf37-4c75-8e28-b5dd84700304.png',
    alt: 'KomputerLaptop',
    text: 'Komputer & Laptop',
    route: 'komputer',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/11/67352b07-2422-4d3e-8a3c-88daa27df2a2.png',
    alt: 'Gaming',
    text: 'Gaming',
    route: 'gaming',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/11/916c36f5-d85a-48ac-9ca8-c4ada643de6b.png',
    alt: 'FashionPria',
    text: 'Fashion Pria',
    route: 'fashionpria',
  },
  {
    src: 'https://images.tokopedia.net/img/cache/160-square/iEWsxH/2023/5/12/94559b24-6a21-437c-8f65-6b2334472295.png',
    alt: 'Makanan',
    text: 'Makanan & Minuman',
    route: 'makanan',
  },
];

const AllCategory = () => {
  return (
    <div className='flex max-w-screen-md mx-auto p-2 overflow-x-hidden'>
      <div className='flex overflow-x-auto scrollbar-hide'>
        {categories.map((category, index) => (
          <div className='flex-shrink-0 mx-1 md:mx-2' key={index}>
            <Link href={`/category/${category.route.toLowerCase()}`} passHref className='inline-block'>
              <picture>
                <img
                  className='w-8 h-8 md:w-12 md:h-12 object-cover rounded-lg mx-auto'
                  src={category.src}
                  alt={category.alt}
                />
                <p className='w-16 text-center text-[12px]'>{category.text}</p>
              </picture>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
