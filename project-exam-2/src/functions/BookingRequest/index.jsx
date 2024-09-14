import { API_KEY, BASE_API, BOOKINGS_API } from "../../constants/apiUrl";

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
