/**
 * Validates the email and password fields in the user data object.
 *
 * @param {Object} userData - The user data object containing fields to validate (email and password).
 * @param {function} setValidationErrors - Function to set validation error messages.
 *
 * @returns {boolean} - Returns `true` if all validations pass, `false` otherwise.
 */

export const validateForm = (userData, setValidationErrors) => {
  const errors = {};

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!emailPattern.test(userData.email)) {
    errors.email = "Email must be a valid @stud.noroff.no address.";
  }

  // Password validation
  if (userData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
