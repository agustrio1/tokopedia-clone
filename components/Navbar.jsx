import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineMail } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCart } from "react-icons/bi";
import { useRouter } from "next/router";
import OffCanvasMenu from "@/components/offCanvasMenu";

const Navbar = () => {
  const router = useRouter();
  const [isNav, setIsNav] = useState(false);

  const openNav = () => {
    setIsNav(!isNav);
  };

  const closeNav = () => {
    setIsNav(false);
  };

  return (
    <header className="mx-auto bg-primary p-4 md:flex md:justify-between item-center md:items-center top-0 z-10 bg-white fixed">
      <div className="flex items-center">
        <Link href="#">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari di Tokopedia"
              className="bg-white rounded-xl pl-4 md:pl-10 pr-4 py-2 w-full md:w-auto text-base border border-gray-300 outline-none focus:border-green-500 transition-all"
            />
            <AiOutlineSearch
              className="absolute left-4 top-3 text-gray-900"
              size={20}
            />
          </div>
        </Link>
        <div className="ml-auto pl-3 flex items-center space-x-4">
          <Link href="/login">
            <button className="bg-white p-2 rounded-lg cursor-pointer">
              <AiOutlineMail className="text-gray-900" size={24} />
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-white p-2 rounded-lg cursor-pointer">
              <IoIosNotificationsOutline className="text-gray-900" size={24} />
            </button>
          </Link>
          <Link href="/keranjang">
            <button className="bg-white p-2 rounded-lg cursor-pointer">
              <BiCart className="text-gray-900" size={24} />
            </button>
          </Link>
          <span
            onClick={openNav}
            className="p-[9px] bg-white rounded-md cursor-pointer">
            <RxHamburgerMenu
              className={`transition ease-in duration-150 ${
                isNav ? "rotate-180" : "0"
              }`}
              size={24}
            />
          </span>
        </div>
      </div>
      {isNav && <OffCanvasMenu closeNav={closeNav} />}
    </header>
  );
};

export default Navbar;
