import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoArrowBack, IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import OffCanvasMenu from "@/components/offCanvasMenu.jsx";
import { useHeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import { handleSearch, handleItemsClick, handleKeyPress } from "@/utils/productHeaderUtils";

function ProductHeader() {
  const router = useRouter();
  const {
    isNav,
    openNav,
    closeNav,
    headerBackground,
    updateHeaderBackground,
    addScrollListener,
    removeScrollListener,
  } = useHeaderContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchResults([]);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 p-2 flex justify-between items-center max-w-[600px] mx-auto z-20 border-b"
      style={{
        background: `linear-gradient(to bottom, ${headerBackground.startColor}, ${headerBackground.endColor})`,
      }}
    >
      <div>
        <Link href="/" className="text-lg text-gray-700">
          <IoArrowBack size={24} className="ml-8" />
        </Link>
      </div>
      <div className="flex space-x-4">
        {isSearchOpen ? (
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari di Tokopedia"
              value={searchTerm}
              onChange={(event) => handleSearch(event, setSearchTerm, setSearchResults)}
              onKeyPress={(event) => handleKeyPress(event, searchTerm, setSearchResults)}
              className="bg-white rounded-md pl-4 md:pl-10 pr-2 py-0 w-full md:w-auto text-base border border-gray-300 outline-none focus:border-green-500 transition-opacity"
            />
            <button
              onClick={toggleSearch}
              className="ml-2 text-gray-900 focus:outline-none"
            >
              <AiOutlineSearch size={24} />
            </button>
            {searchResults.length > 0 && (
              <div className="absolute mt-12 md:mt-16 top-0 p-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={() => handleItemsClick(router, result.id, setSearchTerm, setSearchResults)}
                  >
                    {result.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            className="text-lg text-gray-700"
            onClick={toggleSearch}
          >
            <AiOutlineSearch 
            size={24}
            onClick={toggleSearch}
            />
          </button>
        )}
        <button className="text-lg text-gray-700" disabled>
          <IoShareSocialOutline size={24} />
        </button>
        <button className="text-lg text-gray-700" disabled>
          <Link href="/keranjang">
            <BiCart size={24} />
          </Link>
        </button>
        <span onClick={openNav} className="p-[9px]rounded-md cursor-pointer">
          <RxHamburgerMenu size={24} />
        </span>
      </div>
      {isNav && <OffCanvasMenu closeNav={closeNav} />}
    </header>
  );
}

export default ProductHeader;
