import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import MyButton from "../Button";
import BookingRequest from "../../functions/BookingRequest";

/**
 * Calendar component for selecting booking dates and guests.
 *
 * @param {Object} props - The component props.
 * @param {Array} [props.bookings] - The existing bookings for the venue.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 * @param {string} props.venueId - The ID of the venue being booked.
 * @param {boolean} props.isOwner - Indicates if the current user is the owner of the venue.
 *
 * @returns {JSX.Element} The rendered Calendar component.
 */

function Calendar({ bookings = [], maxGuests, venueId, isOwner }) {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [guests, setGuests] = useState(1); // Guests state initialized to 1
  const [error, setError] = useState("");

  const handleChange = (ranges) => {
    setDate(ranges.selection); // Update the selected date range in the state
  };

  // Disable booked dates
  const disabledDates = bookings.flatMap((booking) => {
    const dateArray = [];
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);

    // Iterate through each day in the booking range and add it to the array
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      dateArray.push(new Date(date));
    }
    return dateArray;
  });

  // Function to make a booking (send POST request)
  const handleBooking = async () => {
    // Validate the number of guests
    if (guests > maxGuests) {
      setError(`Number of guests cannot exceed ${maxGuests}.`);
      return;
    }
    if (guests === 0) {
      setError(`Must be at least 1 guest.`);
      return;
    }

    // Check if the start date and end date are valid
    if (!date.startDate || !date.endDate || date.startDate >= date.endDate) {
      setError("Please select a valid date range.");
      return;
    }

    const bookingData = {
      dateFrom: date.startDate.toISOString(),
      dateTo: date.endDate.toISOString(),
      guests,
      venueId,
    };

    try {
      const data = await BookingRequest(bookingData); // Call the API function
      console.log("Booking successful:", data);
      setError(""); // Clear any previous error

      // Show a thank you message and then reload the page
      window.alert("Thank you for your booking!");
      window.location.reload();
    } catch (error) {
      if (error.message.includes("401")) {
        setError("Unauthorized: Please log in to make a booking.");
      } else {
        setError("An error occurred while making the booking.");
      }
    }
  };

  return (
    <>
      <DateRange
        ranges={[date]}
        months={1}
        onChange={handleChange}
        disabledDates={disabledDates}
        minDate={new Date()} // Disable past dates
        className="shadow-sm"
      />
      {/* Conditional rendering of the Book button */}
      {!isOwner && (
        <div className="d-flex flex-column gap-3 align-items-center mt-4 mb-4">
          <div>
            <label htmlFor="guestno">Number of Guests: </label>
            <input
              id="guestno"
              type="number"
              value={guests}
              min={1}
              max={maxGuests} // Enforce max guest count in the input field
              onChange={(e) => setGuests(Number(e.target.value))}
              style={{ width: "40px", border: "none" }}
              className="rounded shadow-sm"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <MyButton onClick={handleBooking} label="Book" />
        </div>
      )}
    </>
  );
}

export default Calendar;
