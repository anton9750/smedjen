
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import type { Product } from "./useProducts";

function useProduct(id: string | undefined) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const product = await apiRequest<Product>(`/products/${id}`);

        setData(product);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { data, loading, error };
}

export default useProduct;
