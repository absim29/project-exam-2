import React from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import VenuePage from "../../components/VenuePage";
import { useFetchSingle } from "../../hooks/useFetchSingle";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function SingleVenue() {
  let { id } = useParams();
  const { data, isError, isLoading } = useFetchSingle(url, id);
  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError) {
    return <div>Error loading venue details. Please try again later.</div>;
  }

  if (!data) {
    return (
      <div>No venue data found. Please check the ID or try again later.</div>
    );
  }

  return (
    <Layout>
      <VenuePage key={data.id} venue={data} />
    </Layout>
  );
}

export default SingleVenue;
