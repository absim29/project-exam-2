/**
 * Validates the fields required to add a venue, including media URL, name, description, price, and max guests.
 *
 * @param {Object} userData - The user data object containing fields to validate (media, name, description, price, maxGuests).
 * @param {function} setValidationErrors - Function to set validation error messages.
 *
 * @returns {boolean} - Returns `true` if all validations pass, `false` otherwise.
 */

export const validateAddVenue = (userData, setValidationErrors) => {
  const errors = {};

  // Media URL validation
  if (userData.media && userData.media.length > 0) {
    if (!userData.media[0].url) {
      errors.mediaUrl = "Media URL is required.";
    } else {
      try {
        new URL(userData.media[0].url); // Check if URL is valid
      } catch (_) {
        errors.mediaUrl = "Media URL must be a valid URL.";
      }
    }
  }

  // Name validation
  if (!userData.name) {
    errors.name = "Name is required.";
  }

  // Description validation
  if (!userData.description) {
    errors.description = "Description is required.";
  }

  // Price validation
  if (!userData.price) {
    errors.price = "Price is required.";
  } else if (userData.price > 10000) {
    errors.price = "Price cannot be greater than 10,000.";
  }

  // Max Guests validation
  if (!userData.maxGuests) {
    errors.maxGuests = "Max guests is required.";
  } else if (userData.maxGuests > 100) {
    errors.maxGuests = "A venue cannot accommodate more than 100 guests.";
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
