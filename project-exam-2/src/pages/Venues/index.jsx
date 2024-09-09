import React from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";
import { useFetch } from "../../hooks/useFetch";
import MyButton from "../../components/Button";

const url = (page, pageSize) =>
  `https://v2.api.noroff.dev/holidaze/venues?limit=${pageSize}&page=${page}`;

function Venues() {
  const { data, isError, isLoading, page, prevPage, nextPage } = useFetch(url);

  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Layout>
      <h2 className="second-font mt-2">Find your next holiday destination</h2>

      {data.length === 0 ? (
        <div>No more venues available at this time.</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-4 mx-5 px-5">
          {data.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
      <div className="d-flex w-50 pb-5 justify-content-between">
        <MyButton
          disabled={isLoading || page === 1} // Disable previous button if on the first page
          onClick={prevPage}
          label="<"
        />
        <MyButton
          disabled={isLoading || data.length === 1} // Disable next button if no data is returned
          onClick={nextPage}
          label=">"
        />
      </div>
    </Layout>
  );
}

export default Venues;
