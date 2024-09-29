import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom React hook to handle user sign-out functionality.
 *
 * @returns {function} signOut - Function to sign out the user, clear local storage, navigate to the venues page, and reload the window.
 */

function useSignOut() {
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("avatarUrl");

    navigate("/venues");
    window.location.reload();
  }, [navigate]);

  return signOut;
}

export default useSignOut;
