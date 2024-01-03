import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { retriveData } from '@/firebase/service';
import ProductCard from '@/components/productdetails/ProductCard';
import Link from 'next/link';

function Sepatu() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await retriveData('products');
        const smartphoneProducts = allProducts.filter(product => product.category === 'sepatu');
        setProducts(smartphoneProducts);
      } catch (error) {
        console.error('Error fetching sepatu products:', error);
      }
    };

    fetchProducts();
  }, []);
  

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Handphone & Tablet</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sepatu;
