import { useState, useEffect } from "react";

/**
 * Custom React hook to fetch data from a given API URL.
 *
 * @param {string} apiUrl - The URL to fetch data from.
 *
 * @returns {{
 *  data: any[],
 *  isLoading: boolean,
 *  isError: boolean
 * }}
 *  - `data`: The fetched data array.
 *  - `isLoading`: Whether the data is still being fetched.
 *  - `isError`: Whether there was an error during the fetch operation.
 */

function useFetch(apiUrl) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [apiUrl]);

  return {
    data,
    isLoading,
    isError,
  };
}

export { useFetch };
