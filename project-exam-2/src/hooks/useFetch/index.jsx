import { useState, useEffect } from "react";

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
