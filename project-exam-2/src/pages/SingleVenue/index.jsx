import React from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import VenuePage from "../../components/VenuePage";
import { useFetchSingle } from "../../hooks/useFetchSingle";
import { BASE_API, VENUES_API } from "../../constants/apiUrl";
import { Box, LinearProgress } from "@mui/material";

const url = BASE_API + VENUES_API;

/**
 * SingleVenue component for displaying details of a specific venue.
 * It retrieves the venue ID from the URL parameters, fetches the venue data,
 * and displays a loading indicator or error message as needed.
 *
 * @component
 * @example
 * return (
 *   <SingleVenue />
 * )
 */

function SingleVenue() {
  let { id } = useParams();
  const { data, isError, isLoading } = useFetchSingle(url, id);

  return (
    <Layout>
      {isLoading ? (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      ) : isError ? (
        <div>Error loading data</div>
      ) : !data ? (
        <div>No venue data found. Please check the ID or try again later.</div>
      ) : (
        <VenuePage venue={data} />
      )}
    </Layout>
  );
}

export default SingleVenue;
