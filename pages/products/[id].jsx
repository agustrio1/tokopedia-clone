import { useRouter } from "next/router";
import ProductDetails from "../components/productdetails/ProductDetails";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";

function useProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  return { id };
}

const productPage = () => {
  const isNavbarVisible = false;
  const isBottombarVisible = false;
  const {id} = useProductDetails();

  return (
    <div className="z-20">
      {isNavbarVisible && <Navbar />}
      <ProductDetails productId={id} />
      {isBottombarVisible && <BottomBar />}
    </div>
  );
};

export default productPage;
