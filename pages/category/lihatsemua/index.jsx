import Link from "next/link";
import React, { useState } from "react";
import { BsChevronCompactUp } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import Electronic from "./components/Electronic";
import Game from "./components/Game";
import Fashion from "./components/Fashion";
import Featured from "./components/Featured";
import Perlengkapan from "./components/Perlengkapan";
import Kebutuhan from "./components/Kebutuhan";

function LihatSemua() {
  const [isFeaturedOpen, setFeaturedOpen] = useState(false);
  const [isElectronicsOpen, setElectronicsOpen] = useState(false);
  const [isFashionOpen, setFashionOpen] = useState(false);
  const [isKebutuhanOpen, setIsKebutuhanOpen] = useState(false);
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const toggleSection = (setSectionState) => {
    setSectionState((prevState) => !prevState);
  };

  const sectionData = [
    { label: "Featured", open: isFeaturedOpen, setOpen: setFeaturedOpen, component: <Featured /> },
    { label: "Elektronik", open: isElectronicsOpen, setOpen: setElectronicsOpen, component: <Electronic /> },
    { label: "Fashion", open: isFashionOpen, setOpen: setFashionOpen, component: <Fashion /> },
    { label: "Kebutuhan Harian", open: isKebutuhanOpen, setOpen: setIsKebutuhanOpen, component: <Kebutuhan /> },
    { label: "Perlengkapan & Dekorasi", open: isFoodOpen, setOpen: setIsFoodOpen, component: <Perlengkapan /> },
    { label: "Game & Hobi", open: isGameOpen, setOpen: setIsGameOpen, component: <Game /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-10 flex flex-col overflow-y-auto">
      <div className="bg-white rounded-md p-4 w-full cursor-pointer flex items-center justify-between shadow-md border-b border-gray-300 fixed">
        <Link href={"/"} className="flex items-center flex-row">
          <IoArrowBack size={24} className="top-0 left-0 z-10 text-gray-500" />
          <p className="ml-2 text-md font-bold text-gray-700">
            Jelajah Tokopedia
          </p>
        </Link>
      </div>
      <div className="max-w-[600px] mx-auto p-2 mt-8">
        {sectionData.map((section, index) => (
          <div key={index} className="mt-8">
            <div
              className="flex flex-row max-w-screen-md items-center justify-between cursor-pointer mb-8"
              onClick={() => toggleSection(section.setOpen)}
            >
              <p className="mr-16">{section.label}</p>
              <BsChevronCompactUp
                className={`transition ease-in duration-150 transform ${
                  section.open ? "rotate-180" : "rotate-0"
                } ml-48 zIndex`}
              />
            </div>
            {section.open && section.component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LihatSemua;