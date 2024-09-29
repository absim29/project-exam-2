import { useState } from "react";
import { BASE_API, REGISTER_API } from "../../constants/apiUrl";

/**
 * Custom React hook to handle user registration form submission, validation, and modal control.
 *
 * @param {Object} initialState - The initial state of the registration form data (e.g., username, password, email).
 * @param {function} validateForm - Function to validate the form data.
 * @param {function} handleClose - Function to close the registration modal.
 * @param {function} handleOpenLogin - Function to open the login modal.
 *
 * @returns {{
 *  userData: Object,
 *  setUserData: function,
 *  loading: boolean,
 *  error: string | null,
 *  validationErrors: Object,
 *  handleSubmit: function
 * }}
 *  - `userData`: The form data object (e.g., username, password, email).
 *  - `setUserData`: Function to update the form data state.
 *  - `loading`: A boolean indicating whether the form is submitting.
 *  - `error`: A string containing any error message from the registration process or `null` if no error occurred.
 *  - `validationErrors`: An object containing validation errors for each form field.
 *  - `handleSubmit`: Function to handle form submission, including API calls and form validation.
 */

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
