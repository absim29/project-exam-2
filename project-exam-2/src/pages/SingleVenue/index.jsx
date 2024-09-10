import React from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import VenuePage from "../../components/VenuePage";
import { useFetchSingle } from "../../hooks/useFetchSingle";
import { Spinner } from "react-bootstrap";
import { BASE_API, VENUES_API } from "../../constants/apiUrl";

const url = BASE_API + VENUES_API;

function SingleVenue() {
  let { id } = useParams();
  const { data, isError, isLoading } = useFetchSingle(url, id);

  return (
    <Layout>
      {isLoading ? (
        <Spinner animation="border" role="status" className="text-black">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : isError ? (
        <div>Error loading data</div>
      ) : !data ? (
        <div>No venue data found. Please check the ID or try again later.</div>
      ) : (
        <VenuePage key={data.id} venue={data} />
      )}
    </Layout>
  );
}

export default SingleVenue;
