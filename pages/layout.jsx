import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import BottomBar from "../components/BottomBar";
import Navbar from "../components/Navbar";
import { HeaderProvider } from "@/context/HeaderContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const isProductPage = router.pathname.includes("/products");
  const isCartPage = router.pathname.includes("/keranjang");
  const isWishlistPage = router.pathname.includes("/wishlist");

  return (
    <AuthProvider>
      <HeaderProvider>
        <div className="flex flex-col items-center justify-center top-0">
          {!isProductPage && !isCartPage && !isWishlistPage && <Navbar />}
          <main className="">{children}</main>
          {!isProductPage && !isCartPage && <BottomBar />}
        </div>
      </HeaderProvider>
    </AuthProvider>
  );
};

export default Layout;
