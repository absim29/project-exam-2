import { useState } from "react";
import { API_KEY } from "../../constants/apiUrl";

function useUpdate(initialState, validateForm, url, method = "PUT") {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(userData, setValidationErrors)) {
      return; // Stop submission if validation fails
    }
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(userData),
      });

      const update = await response.json();

      if (!response.ok) {
        throw new Error(
          update.message || "Submission failed. Please try again."
        );
      }

      const storedAvatarUrl = localStorage.getItem("avatarUrl");

      // Access avatar data from the nested `data.avatar` object
      const newAvatarUrl = update?.data?.avatar?.url;

      if (newAvatarUrl) {
        // Update the avatar in localStorage
        if (storedAvatarUrl !== newAvatarUrl) {
          localStorage.setItem("avatarUrl", newAvatarUrl);
        }
      }

      window.location.reload();
    } catch (err) {
      // Handle any errors
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    setUserData,
    loading,
    error,
    validationErrors,
    handleSubmit,
  };
}

export default useUpdate;
