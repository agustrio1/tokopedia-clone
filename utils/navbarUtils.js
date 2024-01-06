import { retriveData } from "@/firebase/service";

export const handleSearch = async (term, setSearchTerm, setSearchResults) => {
  try {
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

export const fetchSearchResults = async (searchTerm, setSearchResults) => {
  try {
    if (searchTerm.trim() !== "") {
      const products = await retriveData("products");
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
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
