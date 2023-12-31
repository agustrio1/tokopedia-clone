import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ productId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (
        window.innerHeight + scrollPosition >=
        document.documentElement.offsetHeight - 200
      ) {
        if (!loadingMore && visibleProducts < data.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleProducts((prev) => Math.min(prev + 6, data.length));
            setLoadingMore(false);
          }, 800);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore, visibleProducts, data.length]);

  const renderPlaceholderCards = (count) => {
    const placeholderCards = [];

    for (const i of Array(count).keys()) {
      placeholderCards.push(
        <div
          key={`placeholder-${i}`}
          className="bg-gray-300 p-2 shadow-lg rounded-md animate-pulse mx-2"
        >
          <div className="w-40 h-40 bg-gray-400 mb-4 items-center mx-auto"></div>
          <div className="h-4 bg-gray-400 mb-2"></div>
          <div className="h-4 bg-gray-400 mb-2"></div>
          <div className="h-4 bg-gray-400"></div>
        </div>
      );
    }

    return placeholderCards;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-w-screen-sm p-4 mx-auto mb-8">
      {loading && !data.length
        ? renderPlaceholderCards(6)
        : data.slice(0, visibleProducts).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              as={`/products/${item.id}`}
            >
              <div
                key={item.id}
                className="bg-white p-2 shadow-lg rounded-md"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="object-cover mb-4 items-center mx-auto"
                />
                <p className="text-sm font-bold mb-2 text-center overflow-hidden">
                  {item.name.length > 30 ? (
                    <span title={item.name}>
                      {item.name.substring(0, 17)}...
                    </span>
                  ) : (
                    item.name
                  )}
                </p>
                <p className="text-gray-500 mb-2 text-center">
                  {item.category}
                </p>
                <p className="text-black font-bold mb-2 text-center text-sm">
                  Rp. {new Intl.NumberFormat("id-ID").format(item.price)}
                </p>
              </div>
            </Link>
          ))}
      {loadingMore && renderPlaceholderCards(6)}
    </div>
  );
};

export default Card;
