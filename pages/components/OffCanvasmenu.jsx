import React from "react";
import { MdClose } from "react-icons/md";
import AuthMenu from "./AuthMenu";

const OffCanvasMenu = ({ closeNav }) => {
  return (
    <div className="fixed top-0 left-0 pl-4 p-8 w-full h-full bg-white z-50 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full bg-white rounded-md overflow-x-8 flex flex-col items-start">
        <span
          onClick={closeNav}
          className="bg-white rounded-md p-4 left-0 right-0 cursor-pointer flex items-center border-b border-gray-300 w-full">
          <MdClose size={24} className="top-0 left-0 z-10" />
          <p className="ml-2">Menu utama</p>
        </span>
      </div>
      <ul className="fixed mt-16 top-4 w-full h-full flex flex-col text-[15px] opacity-75 px-9">
        <div>
          <AuthMenu />
        </div>
        <li>
          <a href="/shop" className="py-3 inline-block w-full ">
            Shop
          </a>
        </li>
        <li>
          <a href="/filters" className="py-3 inline-block w-full ">
            Filters
          </a>
        </li>
        <li>
          <a href="/myproducts" className="py-3 inline-block w-full ">
            My Product
          </a>
        </li>
      </ul>
    </div>
  );
};

export default OffCanvasMenu;
