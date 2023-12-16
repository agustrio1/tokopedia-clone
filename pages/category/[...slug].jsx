import { useRouter } from "next/router"
import LihatSemua from "./lihatsemua"
import Handphone from "./handphone"
import Komputer from "./komputer"
import Elektronik from "./elektronik"
import Gaming from "./gaming"
import FashionPria from "./fashionpria"
import Makanan from "./makanan"

const categoryComponents = {
    lihatsemua: <LihatSemua />,
    handphone: <Handphone />,
    komputer:   <Komputer />,
    elektronik: <Elektronik />,
    gaming: <Gaming />,
    fashionpria: <FashionPria />,
    makanan: <Makanan />
}

const CategoryPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const subCatgeory = slug && slug[0];

    const seleectedComponent = categoryComponents[subCatgeory];

    return seleectedComponent || <p>Not Found</p>
}

export default CategoryPage