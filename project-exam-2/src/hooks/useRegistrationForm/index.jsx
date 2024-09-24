import { useState } from "react";
import { BASE_API, REGISTER_API } from "../../constants/apiUrl";

function useRegistrationForm(
  initialState,
  validateForm,
  handleClose,
  handleOpenLogin
) {
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const url = BASE_API + REGISTER_API; // URL for registration

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

      // // Successful submission
      // const username = user.data.name;
      // const accessToken = user.data.accessToken;
      // const email = user.data.email;
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("username", username);
      // localStorage.setItem("email", email);

      // Close the registration modal and open the login modal
      handleClose();
      handleOpenLogin();
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

export default useRegistrationForm;
