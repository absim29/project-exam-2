import { useState, useEffect } from "react";
import { EXTRAS_VENUE_API } from "../../constants/apiUrl";

/**
 * Custom React hook to fetch data for a single item from an API with a specific ID.
 *
 * @param {string} apiUrl - The base API URL.
 * @param {string|number} id - The unique identifier for the item being fetched.
 *
 * @returns {{
 *  data: any | null,
 *  isLoading: boolean,
 *  isError: boolean
 * }}
 *  - `data`: The fetched data object or null if no data is available.
 *  - `isLoading`: A boolean representing the loading state.
 *  - `isError`: A boolean representing whether an error occurred during the fetch.
 */

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
