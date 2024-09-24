import React, { useState } from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";
import { useFetch } from "../../hooks/useFetch";
import MyButton from "../../components/Button";
import { BASE_API, VENUES_API } from "../../constants/apiUrl";
import SearchBar from "../../components/SearchBar";
import { Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const url = BASE_API + VENUES_API;

function Venues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Local pagination state
  const venuesPerPage = 12;

  const { data: allVenues, isError, isLoading } = useFetch(url);

  // Filter the venues based on the search query
  const filteredVenues = allVenues
    ? allVenues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Reset to the first page when the search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
          <motion.div
            key={currentPage} // Ensure a unique key for each page
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {currentVenues.length === 0 ? (
              <div>No more venues available at this time.</div>
            ) : (
              <div className="d-flex flex-wrap justify-content-center gap-4 mx-xxl-5 mx-xxl-5 mx-xl-5 mx-lg-5 mx-md-5 px-xxl-5">
                {currentVenues.map((venue) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <VenueCard venue={venue} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="d-flex pb-5 justify-content-between gap-5">
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
