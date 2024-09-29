import { API_KEY, BASE_API, BOOKINGS_API } from "../../constants/apiUrl";

/**
 * Sends a booking request to the API with the provided booking data.
 *
 * @param {Object} bookingData - The data to be sent with the booking request, typically containing user and venue information.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data from the API if the request is successful.
 *
 * @throws {Error} - Throws an error if the request fails or the response is not OK.
 */

const url = BASE_API + BOOKINGS_API;

async function BookingRequest(bookingData) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making booking:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
}
export default BookingRequest;
