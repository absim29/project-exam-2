import { useState } from "react";

const useAuthForm = (initialState, validateForm, url, handleClose) => {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

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
        throw new Error(user.message || "Submission failed. Please try again.");
      }

      // Successful submission
      const accessToken = user.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      handleClose(); // This would need to be passed or managed differently
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
};

export default useAuthForm;
