import { useState } from "react";
import { API_KEY } from "../../constants/apiUrl";

/**
 * Custom React hook to handle updating user data via a specified API endpoint.
 *
 * @param {Object} initialState - The initial state of the data to be updated.
 * @param {function} validateForm - Function to validate the data before submission.
 * @param {string} url - The API endpoint URL for the update request.
 * @param {string} [method="PUT"] - The HTTP method to use for the request (default is "PUT").
 *
 * @returns {{
 *  userData: Object,
 *  setUserData: function,
 *  loading: boolean,
 *  error: string | null,
 *  validationErrors: Object,
 *  handleSubmit: function
 * }}
 *  - `userData`: The current state of the data being updated.
 *  - `setUserData`: Function to update the user data state.
 *  - `loading`: A boolean indicating whether the update is in progress.
 *  - `error`: A string containing any error message from the update process or `null` if no error occurred.
 *  - `validationErrors`: An object containing any validation errors that occurred during form validation.
 *  - `handleSubmit`: Function to handle form submission, including API calls and error handling.
 */

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
