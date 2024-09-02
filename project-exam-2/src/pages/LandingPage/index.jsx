import React from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import MyButton from "../../components/Button";

function LandingPage() {
  return (
    <>
      <BackgroundVideo />
      <div className="landing-text">
        <h1>Escape the ordinary</h1>
        <h2>Your adventure starts here</h2>
        <MyButton />
      </div>
    </>
  );
}
export default LandingPage;
