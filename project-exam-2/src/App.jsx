import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Venues from "./pages/Venues";
import SingleVenue from "./pages/SingleVenue";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* The LandingPage is displayed when the user is at the root URL */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<SingleVenue />} />
        {/* Page not found handler for unmatched routes */}
        <Route
          path="*"
          element={
            <>
              <h1>Page not found</h1>
              <div className="prodContainer">
                <p>
                  We're sorry, but the page you are looking for doesn't exist.
                </p>
                <p>
                  It might have been moved or deleted, or perhaps the URL is
                  incorrect.
                </p>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
