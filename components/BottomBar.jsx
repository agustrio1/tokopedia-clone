import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const navs = [
  {
    icon: "apps",
    text: "Home",
    image: "/assets/home-icons.svg",
    activeImage: '/assets/home-active-icons.svg',
    route: "/home"
  },
  {
    icon: "heart",
    text: "Feed",
    image: "/assets/feed-icons.svg",
    activeImage: '/assets/feed-active-icons.svg',
    route: "/feed"
  },
  {
    icon: "cart",
    text: "Official-Store",
    image: "/assets/offical-icons.svg",
    activeImage: 'https://assets.tokopedia.net/assets-tokopedia-lite/v2/poseidon/kratos/1200192a.svg',
    route: "/official-store"
  },
  {
    icon: "wishlist",
    text: "Wishlist",
    image: "/assets/wishlist-icons.svg",
    activeImage: '/assets/wishlist-active-icons.svg',
    route: "/wishlist"
  },
  {
    icon: "transaction",
    text: "Transaksi",
    image: "/assets/transaction-icons.svg",
    activeImage: '/assets/transaction-active-icons.svg',
    route: "/transaksi"
  },
];

const BottomBar = () => {
  const [activeIcon, setActiveIcon] = useState(navs[0].icon);

  const handleIconsClick = (icons) => {
    setActiveIcon(icons);
  };

  return (
    <footer className="flex flex-row items-start justify-between fixed bottom-0 w-full max-w-lg p-2 bg-white">
      <div className="flex flex-row justify-evenly sm:justify-evenly items-center mr-2 h-10 sm:h-8 space-x-2 sm:space-x-6 lg:space-x-10 w-full md:max-w-screen-md xl:max-w-screen-lg mx-auto">
        {navs.map((item, index) => (
          <Link
            key={index}
            href={item.route.toLowerCase()}
            passHref
            className="flex flex-col items-center"
            onClick={() => handleIconsClick(item.icon)}
          >
            <Image
              src={activeIcon === item.icon ? item.activeImage : item.image}
              alt={item.text}
              width={24}
              height={24}
              priority={true}
              className="object-cover"
            />
            <p className={`text-xs sm:text-sm ${activeIcon === item.icon ? 'text-gray-700' : 'text-gray-500'}`}>{item.text}</p>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default BottomBar;
