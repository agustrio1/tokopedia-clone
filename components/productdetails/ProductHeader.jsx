import React, { useEffect } from "react";
import { IoArrowBack, IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import OffCanvasMenu from "@/components/offCanvasMenu.jsx";
import { useHeaderContext } from "@/context/HeaderContext";
import Link from "next/link";

function ProductHeader() {
  const {
    isNav,
    openNav,
    closeNav,
    headerBackground,
    updateHeaderBackground,
    addScrollListener,
    removeScrollListener,
  } = useHeaderContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      updateHeaderBackground(scrollPosition);
    };
    addScrollListener(handleScroll);

    return () => {
      removeScrollListener(handleScroll);
    };
  }, [addScrollListener, removeScrollListener, updateHeaderBackground]);

  return (
    <header
      className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center max-w-[600px] mx-auto z-20"
      style={{
        background: `linear-gradient(to bottom, ${headerBackground.startColor}, ${headerBackground.endColor})`,
      }}>
      <div>
        <Link href="/" className="text-lg text-gray-700">
          <IoArrowBack size={24} className="ml-8" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <button className="text-lg text-gray-700" disabled>
          <AiOutlineSearch size={24} />
        </button>
        <button className="text-lg text-gray-700" disabled>
          <IoShareSocialOutline size={24} />
        </button>
        <button className="text-lg text-gray-700" disabled>
          <Link href="/keranjang">
            <BiCart size={24} />
          </Link>
        </button>
        <span
          onClick={openNav}
          className="p-[9px] bg-white rounded-md cursor-pointer">
          <RxHamburgerMenu size={24} />
        </span>
      </div>
      {isNav && <OffCanvasMenu closeNav={closeNav} />}
    </header>
  );
}

export default ProductHeader;
