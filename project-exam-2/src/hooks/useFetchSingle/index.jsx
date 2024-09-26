import { useState, useEffect } from "react";
import { EXTRAS_VENUE_API } from "../../constants/apiUrl";

function useFetchSingle(apiUrl, id) {
  const [data, setData] = useState(null);
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
        console.log(result);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }
    // Directly append the query parameter ?_bookings=true to find the venue bookings
    fetchData(`${apiUrl}/${id}${EXTRAS_VENUE_API}`);
  }, [apiUrl, id]);

  return {
    data,
    isLoading,
    isError,
  };
}

export { useFetchSingle };
