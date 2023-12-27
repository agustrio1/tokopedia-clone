import React, { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/init";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isEmailValid = (value) => {
    // Tambahkan logika validasi email jika diperlukan
    return true;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in with email/password:", user);

      router.push("/");
    } catch (error) {
      console.error("Error logging in with email/password:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Login dengan akun Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in with Google:", user);

      // Redirect ke halaman setelah login berhasil
      router.push("/"); // Ganti dengan halaman yang diinginkan setelah login
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Tangani kesalahan login dengan Google di sini
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-10 flex flex-col">
      <div className="bg-white rounded-md p-4 w-full cursor-pointer flex items-center justify-between border-b border-gray-300">
        <Link href={"/"}>
          <IoArrowBack size={24} className="top-0 left-0 z-10" />
        </Link>
        <Link
          href={"/register"}
          className="flex flex-row items-end text-green-500">
          Daftar
        </Link>
      </div>
      <form className="w-full md:w-1/2 mx-auto mt-4" method="POST">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="border-b w-full md:w-full left-0 right-0 border-green-300 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline-gray"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="border-b w-full md:w-full left-0 right-0 border-green-300 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline-gray"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={!isEmailValid(email) || password.length === 0}
          className={`${
            isEmailValid(email) && password.length > 0
              ? "bg-green-500"
              : "bg-gray-300 cursor-not-allowed"
          } text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue`}>
          Masuk
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white w-full font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline-blue">
          Masuk dengan Google
        </button>
      </form>
    </div>
  );
};

export default Login;
