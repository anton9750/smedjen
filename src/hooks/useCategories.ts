
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export type Category = {
  id: number;
  name: string;
  description: string;
};

function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);

        const categories = await apiRequest<Category[]>("/categories");

        setData(categories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { data, loading, error };
}

export default useCategories;
