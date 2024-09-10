import { useState, useEffect } from "react";
import { API_KEY } from "../../constants/apiUrl";
// import { API_KEY_AUTH, BASE_API } from "../../constants/apiUrl";

function useGetProfile(apiUrl, name) {
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
        console.log("Fetching data from URL:", url);
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
        // setData(result.data);

        console.log(result);

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

    if (name && apiUrl) {
      fetchData(`${apiUrl}/${name}`);
    } else {
      console.warn("Username or API URL is missing."); // Debugging line
      setIsLoading(false); // Stop loading if name or apiUrl is not provided
    }
    return () => {
      isMounted = false;
    };
  }, [apiUrl, name]);

  return {
    data,
    isLoading,
    isError,
  };
}

export default useGetProfile;
