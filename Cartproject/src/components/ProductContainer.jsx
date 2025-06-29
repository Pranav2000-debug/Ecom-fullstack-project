import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

function ProductContainer() {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setData(response?.data?.products); // Fix: correctly access the array
      console.log(response?.data?.products);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

   return (
    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 xl:grid-cols-4 sm:gap-y-2 md:grid-cols-3 justify-items-center   px-4 pt-6">
      {data.map((prod) => (
        <ProductItem key={prod.id} {...prod} />
      ))}
    </div>
  );
}

export default ProductContainer;
