import React from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";
import { useFetch } from "../../hooks/useFetch";
import MyButton from "../../components/Button";
import { Spinner } from "react-bootstrap";
import { BASE_API, VENUES_API } from "../../constants/apiUrl";

const url = (page, pageSize) =>
  BASE_API + VENUES_API + `?limit=${pageSize}&page=${page}`;

function Venues() {
  const { data, isError, isLoading, page, prevPage, nextPage, hasMoreData } =
    useFetch(url);

  return (
    <Layout>
      <h2 className="second-font mt-2">Find your next holiday destination</h2>
      {isLoading ? (
        <Spinner animation="border" role="status" className="text-black">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : isError ? (
        <div>Error loading data</div>
      ) : (
        <>
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
              disabled={!hasMoreData} // Disable next button if no data is returned
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
