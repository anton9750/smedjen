
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export type ProductImage = {
  id: number;
  filename: string;
  path: string;
  alt: string | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  images: ProductImage[];
};

function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const products = await apiRequest<Product[]>("/products");

        setData(products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { data, loading, error };
}

export default useProducts;
