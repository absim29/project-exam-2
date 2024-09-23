import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Venues from "./pages/Venues";
import SingleVenue from "./pages/SingleVenue";
import ProfilePage from "./pages/ProfilePage";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/venues/:id" element={<SingleVenue />} />
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
      </AnimatePresence>
    </div>
  );
}

export default App;
