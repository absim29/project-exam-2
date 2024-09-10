import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useSignOut() {
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    navigate("/");
    window.location.reload();
  }, [navigate]);

  return signOut;
}

export default useSignOut;
