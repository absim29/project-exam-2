import { useState, useEffect } from "react";

function useFetch(apiUrl) {
  const [data, setData] = useState([]);
  // State for holding our loading state
  const [isLoading, setIsLoading] = useState(false);
  // State for holding our error state
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData(url) {
      // Turn on the loading state each time we do an API call
      setIsLoading(true);
      // Reset the error state in case there is an error previously
      setIsError(false);

      try {
        const response = await fetch(url);
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

    fetchData(apiUrl);
  }, [apiUrl]);

  return {
    data,
    isLoading,
    isError,
  };
}

export { useFetch };
