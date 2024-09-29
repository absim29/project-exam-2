import { useState, useEffect } from "react";
import { API_KEY } from "../../constants/apiUrl";
// import { API_KEY_AUTH, BASE_API } from "../../constants/apiUrl";

/**
 * Custom React hook to fetch a user's profile from the given API URL using an access token and an API key.
 *
 * @param {string} apiUrl - The base API URL for fetching the profile.
 *
 * @returns {{
 *  data: any | null,
 *  isLoading: boolean,
 *  isError: boolean
 * }}
 *  - `data`: The profile data or null if no data is fetched.
 *  - `isLoading`: A boolean indicating whether the profile data is still being fetched.
 *  - `isError`: A boolean indicating whether an error occurred during the fetch.
 */

function useGetProfile(apiUrl) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // async function getapikey() {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const response = await fetch(BASE_API + API_KEY_AUTH, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: "Test key",
  //     }),
  //   });
  //   if (response.ok) {
  //     return await response.json();
  //   }
  //   console.error(await response.json());
  //   throw new Error("Could not create API key");
  // }
  // getapikey();

  useEffect(() => {
    let isMounted = true;

    async function fetchData(url) {
      setIsLoading(true);
      setIsError(false);

      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (isMounted) {
          setData(result.data);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          console.error("Fetch error:", error); // Debugging line
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData(apiUrl);

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return {
    data,
    isLoading,
    isError,
  };
}

export default useGetProfile;
