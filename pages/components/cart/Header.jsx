import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import OffCanvasMenu from "../offCanvasMenu";
import { useHeaderContext } from "@/pages/context/HeaderContext";
import Link from "next/link";

function Header() {
  const { isNav, openNav, closeNav } = useHeaderContext();

  return (
    <header className="fixed top-0 left-0 right-0 p-2 max-w-md flex items-center justify-between mx-auto z-10 bg-white border-b border-gray-300">
      <div>
        <Link href={"/"} className="text-lg text-gray-700">
          <IoArrowBack size={20} />
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href={"/wishlist"} className="text-lg text-gray-700">
          <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="var(--color-icon-enabled, #2E3137)"
            style={{
              display: "flex",
              verticalAlign: "center",
              marginTop: "9px",
            }}>
            <path d="M12.11 20.81a1.61 1.61 0 0 1-.92-.28c-2.14-1.28-6-4-7.92-7.64a6.8 6.8 0 0 1 0-7.12 5.39 5.39 0 0 1 4.6-2.54A5.1 5.1 0 0 1 12 5.55a5.14 5.14 0 0 1 4.24-2.32 5.5 5.5 0 0 1 4.56 2.56 7.62 7.62 0 0 1 .15 7c-2.31 4.17-7 7.15-8 7.7a1.63 1.63 0 0 1-.84.32ZM7.87 4.73a3.89 3.89 0 0 0-3.4 1.87c-.18.27-1.6 2.45.13 5.59 1.7 3.32 5.4 5.86 7.4 7.08a.19.19 0 0 0 .2 0c.56-.34 5.29-3.25 7.43-7.1a6.11 6.11 0 0 0-.09-5.6 4 4 0 0 0-3.29-1.86 4.12 4.12 0 0 0-3.57 2.61L12 8.68l-.67-1.34c-.84-1.68-2.07-2.61-3.46-2.61Z" />
          </svg>
        </Link>
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

export default Header;
