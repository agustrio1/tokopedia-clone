import { useRouter } from "next/router"
import ProductDetails from "../components/ProductDetails"
import Navbar from "../components/Navbar"
import BottomBar from "../components/BottomBar"

const productPage = () => {
    const router = useRouter()
    const { id } = router.query
    const isNavbarVisible = false;
    const isBottombarVisible = false;

    return (
        <div className="z-20">
            {isNavbarVisible && <Navbar/>}
            <ProductDetails productId={id} />
            {isBottombarVisible && <BottomBar />}
        </div>
    )
}

export default productPage