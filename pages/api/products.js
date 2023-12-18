import { retriveData, retriveDataById } from "../firebase/service";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    try {
      if (!query.id) {
        const allProducts = await retriveData("products");
        res.status(200).json(allProducts);
      } else {
        const product = await retriveDataById("products", query.id);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
