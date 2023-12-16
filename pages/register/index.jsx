import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RecaptchaVerifier, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const [nomorHpEmail, setNomorHpEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const auth = getAuth();
  const router = useRouter();

  const isNomorHpEmailValid = (value) => {
    return value.length >= 11;
  };

  const handleInputChange = (event) => {
    setNomorHpEmail(event.target.value);
  };

  const handleRegister = async () => {
    try {
      // Validasi kata sandi
      if (password !== repeatPassword) {
        console.error('Password and repeat password do not match.');
        return;
      }

      // Mendaftarkan pengguna dengan email dan kata sandi
      const userCredential = await createUserWithEmailAndPassword(auth, nomorHpEmail, password);
      const user = userCredential.user;
      console.log('Registered user:', user);
      
      // Lakukan navigasi atau tindakan lain setelah pendaftaran berhasil
      router.push('/');
    } catch (error) {
      console.error('Error registering user:', error);
      // Tangani kesalahan pendaftaran di sini
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Mendaftarkan pengguna dengan akun Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in with Google:', user);

      // Lakukan navigasi atau tindakan lain setelah masuk berhasil
      router.push('/verification');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Tangani kesalahan masuk dengan Google di sini
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col z-10">
      <div className="bg-white rounded-md p-4 w-full cursor-pointer flex items-center justify-between border-b border-gray-300">
        <Link href={"/"} className="flex items-center flex-row">
          <IoArrowBack size={24} className="top-0 left-0 z-10" />
          <p className="ml-2 text-md font-bold">Daftar</p>
        </Link>
        <Link href={"/login"} className="flex flex-row items-end text-green-500">
          Masuk
        </Link>
      </div>
      <form className="w-full md:w-1/2 mx-auto mt-4 bg-white" method="POST">
        <div className="mb-6">
          <label htmlFor="nomorHpEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Nomor HP atau Email
          </label>
          <input
            id="nomorHpEmail"
            type="text"
            name="nomorHpEmail"
            value={nomorHpEmail}
            onChange={handleInputChange}
            className="border-b w-full md:w-full left-0 right-0 border-green-300 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline-gray"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b w-full md:w-full left-0 right-0 border-green-300 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline-gray"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="repeatPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Ulangi Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="border-b w-full md:w-full left-0 right-0 border-green-300 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline-gray"
          />
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={!isNomorHpEmailValid(nomorHpEmail)}
          className={`${
            isNomorHpEmailValid(nomorHpEmail)
              ? "bg-green-500"
              : "bg-gray-300 cursor-not-allowed"
          } text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue`}
        >
          Daftar
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white w-full font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline-blue"
        >
          Daftar dengan Google
        </button>
      </form>
    </div>
  );
};

export default Register;
