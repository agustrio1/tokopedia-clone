import { AuthProvider } from "../context/AuthContext";
import BottomBar from "./BottomBar";
import Navbar from "./Navbar";


export const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center top-0">
      <Navbar />
      <main className="">{children}</main>
      <BottomBar/>
      </div>
    </AuthProvider>
  );
};
