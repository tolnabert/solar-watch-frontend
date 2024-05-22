import { useState, useEffect } from "react";

export function useFetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const error = new Error(`Failed to fetch data: ${response.status}`);
          console.error(error);
          throw error;
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, error, isLoading };
}
