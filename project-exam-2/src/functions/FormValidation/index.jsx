/**
 * Validates user data fields including name, email, password, bio, and avatar URL.
 *
 * @param {Object} userData - The user data object containing fields to validate (name, email, password, bio, avatar).
 * @param {function} setValidationErrors - Function to set validation error messages.
 *
 * @returns {boolean} - Returns `true` if all validations pass, `false` otherwise.
 */

export const validateForm = (userData, setValidationErrors) => {
  const errors = {};

  // Name validation
  const namePattern = /^[a-zA-Z0-9_]+$/;
  if (!namePattern.test(userData.name)) {
    errors.name = "Name can only contain letters, numbers, and underscores.";
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!emailPattern.test(userData.email)) {
    errors.email = "Email must be a valid @stud.noroff.no address.";
  }

  // Password validation
  if (userData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  // Bio validation
  if (userData.bio && userData.bio.length > 160) {
    errors.bio = "Bio must be less than 160 characters.";
  }

  // Avatar URL validation
  if (!userData.avatar.url) {
    errors.avatarUrl = "Avatar URL is required.";
  } else {
    try {
      new URL(userData.avatar.url);
    } catch (_) {
      errors.avatarUrl = "Avatar URL must be a valid URL.";
    }
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
