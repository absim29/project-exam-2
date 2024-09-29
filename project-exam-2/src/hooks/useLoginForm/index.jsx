import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API, LOGIN_API, VENUE_MANAGER } from "../../constants/apiUrl";

/**
 * Custom React hook to handle user login form submission and validation.
 *
 * @param {Object} initialState - The initial state of the form data (e.g., username and password).
 * @param {function} validateForm - The validation function to validate form input.
 *
 * @returns {{
 *  userData: Object,
 *  setUserData: function,
 *  loading: boolean,
 *  error: string | null,
 *  validationErrors: Object,
 *  handleSubmit: function
 * }}
 *  - `userData`: The form data state object (e.g., username, password).
 *  - `setUserData`: Function to update the form data state.
 *  - `loading`: A boolean indicating whether the form is currently submitting.
 *  - `error`: A string containing any error message from the login process or `null` if no error occurred.
 *  - `validationErrors`: An object containing validation error messages for each form field.
 *  - `handleSubmit`: The function to handle form submission, including login logic and navigation.
 */

function useLoginForm(initialState, validateForm) {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const url = BASE_API + LOGIN_API + VENUE_MANAGER; // URL for login

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(userData, setValidationErrors)) {
      return; // Stop submission if validation fails
    }
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const user = await response.json();

      if (!response.ok) {
        throw new Error(user.message || "Login failed. Please try again.");
      }

      // On Successful login
      const username = user.data.name;
      const accessToken = user.data.accessToken;
      const email = user.data.email;
      const avatarUrl = user.data.avatar.url;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("avatarUrl", avatarUrl);

      navigate("/venues"); // Navigate to venues after login
      window.location.reload(); // Reload if needed
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

export default useLoginForm;
