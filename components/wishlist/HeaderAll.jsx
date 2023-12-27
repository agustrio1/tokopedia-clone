import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import OffCanvasMenu from "../offCanvasMenu";
import { useHeaderContext } from "@/pages/context/HeaderContext";
import Link from "next/link";

function HeaderAll() {
    const { isNav, openNav, closeNav } = useHeaderContext();               
  return (
    <header className="fixed top-0 left-0 right-0 p-1 max-w-[500px] flex items-center justify-between mx-auto z-10 bg-white border-b border-gray-300">
      <div>
        <Link
          href={"/wishlist"}
          className="text-lg text-gray-700 left-0 right-0 cursor-pointer flex items-center">
          <IoArrowBack size={20} />
          <p className="ml-2 text-[16px] font-semibold">Semua Wishlist</p>
        </Link>
      </div>
      <div className="flex space-x-2">
        <Link href={"/keranjang"} className="text-lg text-gray-700 mt-2">
          <BiCart size={20} />
        </Link>
        <span
          onClick={openNav}
          className="p-[9px] bg-white rounded-md cursor-pointer">
          <RxHamburgerMenu size={20} />
        </span>
      </div>
      {isNav && <OffCanvasMenu closeNav={closeNav} />}
    </header>
  )
}

export default HeaderAll