import { retriveData } from "@/firebase/service";

export const handleSearch = async (event, setSearchTerm, setSearchResults) => {
  try {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const products = await retriveData("products");
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  } catch (error) {
    console.error("Error during search:", error);
    setSearchResults([]);
  }
};

export const handleItemsClick = (router, productId, setSearchTerm, setSearchResults) => {
  router.push(`/products/${productId}`);
  setSearchTerm("");
  setSearchResults([]);
};

export const handleKeyPress = (event, searchTerm, setSearchResults) => {
  if (event.key === "Enter" && searchTerm.trim() === "") {
    setSearchResults([]);
  }
};
