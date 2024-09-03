import React from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";
import { useFetch } from "../../hooks/useFetch";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function Venues() {
  const { data, isError, isLoading } = useFetch(url);
  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Layout>
      <h2 className="second-font mt-2">Find your next holiday destination</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4 mx-5 px-5">
        {data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </Layout>
  );
}

export default Venues;
