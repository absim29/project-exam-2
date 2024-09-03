import React from "react";
import Layout from "../../components/Layout";
import VenueCard from "../../components/VenueCard";

function Venues() {
  return (
    <Layout>
      <h2 className="second-font">Find your next holiday destination</h2>
      <VenueCard />
    </Layout>
  );
}

export default Venues;
