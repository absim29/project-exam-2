import { useState, useEffect } from "react";

function useFetch(apiUrl) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1); // Start with page 1
  const pageSize = 5; // Number of results per page

  useEffect(() => {
    async function fetchData() {
      // Turn on the loading state each time we do an API call
      setIsLoading(true);
      // Reset the error state in case there is an error previously
      setIsError(false);

      try {
        const response = await fetch(apiUrl(page, pageSize));
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
  }, [apiUrl, page, pageSize]);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(Math.max(0, page - 1));

  return {
    data,
    isLoading,
    isError,
    page,
    setPage,
    nextPage,
    prevPage,
  };
}

export { useFetch };
