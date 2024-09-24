import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API, LOGIN_API, VENUE_MANAGER } from "../../constants/apiUrl";

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

      // Successful submission
      const username = user.data.name;
      const accessToken = user.data.accessToken;
      const email = user.data.email;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

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
