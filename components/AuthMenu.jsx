import React from "react";
import { MdPerson, MdSettings, MdStore, MdExitToApp } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase/init";

const AuthMenu = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full">
      {user ? (
        <div className="flex items-center w-full p-6">
          <div className=" flex items-start">
            <div className="rounded-full bg-gray-300 overflow-hidden">
              <MdPerson size={24} />
            </div>
            <p className="ml-2">{user.email}</p>
          </div>
          <div className="flex items-end cursor-pointer ml-auto">
            <MdSettings size={24} />
            <p className="ml-2">Settings</p>
          </div>
        </div>
      ) : (
        <>
          <Link
            href={"/login"}
            className="bg-green-600 text-white p-2 mx-auto text-center w-full rounded-md cursor-pointer">
            Masuk
          </Link>
          <Link
            href={"/register"}
            className="bg-green-600 text-white p-2 mx-auto text-center w-full rounded-md cursor-pointer mt-2">
            Daftar
          </Link>
        </>
      )}
      {user && (
        <div className="flex flex-row mt-2 w-full p-6 space-x-2">
          <div className="left-8 flex items-start border border-gray-400 rounded-md p-2 w-full">
            <MdStore size={24} />
            <p className="ml-2">Buka Toko</p>
          </div>
          <div
            className="right-8 flex items-end cursor-pointer ml-auto border border-gray-400 rounded-md p-2 w-full"
            onClick={handleLogout}>
            <MdExitToApp size={24} />
            <p className="ml-2">Keluar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthMenu;
