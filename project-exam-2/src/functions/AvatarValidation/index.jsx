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
