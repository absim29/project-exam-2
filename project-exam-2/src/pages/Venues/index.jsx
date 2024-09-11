import React, { useState } from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";
import { useFetch } from "../../hooks/useFetch";
import MyButton from "../../components/Button";
import { BASE_API, VENUES_API } from "../../constants/apiUrl";
import SearchBar from "../../components/SearchBar";
import { Box, LinearProgress } from "@mui/material";

const url = BASE_API + VENUES_API;

function Venues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Local pagination state
  const venuesPerPage = 10;

  const { data: allVenues, isError, isLoading } = useFetch(url);
  console.log(allVenues);
  // Filter the venues based on the search query
  const filteredVenues = allVenues
    ? allVenues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Implement local pagination: slice the filtered results for the current page
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(
    indexOfFirstVenue,
    indexOfLastVenue
  );

  // Change page handler
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredVenues.length / venuesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <h2 className="second-font mt-2">Find your next holiday destination</h2>
      <SearchBar onSearch={setSearchQuery} />
      {isLoading ? (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      ) : isError ? (
        <div>Error loading data</div>
      ) : (
        <>
          {currentVenues.length === 0 ? (
            <div>No more venues available at this time.</div>
          ) : (
            <div className="d-flex flex-wrap justify-content-center gap-4 mx-5 px-5">
              {currentVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
          <div className="d-flex w-50 pb-5 justify-content-between">
            <MyButton
              disabled={currentPage === 1} // Disable previous button if on the first page
              onClick={prevPage}
              label="<"
            />
            <MyButton
              disabled={
                currentPage >= Math.ceil(filteredVenues.length / venuesPerPage)
              } // Disable next button if no data is returned
              onClick={nextPage}
              label=">"
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default Venues;
