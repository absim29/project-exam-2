/**
 * Validates the avatar URL in the user data object.
 *
 * @param {Object} userData - The user data object containing the avatar information.
 * @param {function} setValidationErrors - Function to set validation error messages.
 *
 * @returns {boolean} - Returns `true` if the avatar URL is valid, `false` otherwise.
 */

export const validateAvatar = (userData, setValidationErrors) => {
  const errors = {};

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
