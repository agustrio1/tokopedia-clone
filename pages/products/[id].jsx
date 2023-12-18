import { useRouter } from "next/router"
import ProductDetails from "../components/ProductDetails"

const productPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <div className="z-20">
            <ProductDetails productId={id} />
        </div>
    )
}

export default productPage