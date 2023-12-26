import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";
import BottomBar from "./BottomBar";
import Navbar from "./Navbar";
import { HeaderProvider } from "../context/HeaderContext";

export const Layout = ({ children }) => {
  const router = useRouter();
  const isProductPage = router.pathname.includes("/products");
  const isCartPage = router.pathname.includes("/keranjang");

  return (
    <AuthProvider>
      <HeaderProvider>
        <div className="flex flex-col items-center justify-center top-0">
          {!isProductPage && !isCartPage && <Navbar />}
          <main className="">{children}</main>
          {!isProductPage && !isCartPage && <BottomBar />}
        </div>
      </HeaderProvider>
    </AuthProvider>
  );
};
