import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  BASE_API,
  EXTRAS_PROFILE_API,
  PROFILES_API,
} from "../../constants/apiUrl";
import Profile from "../../components/Profile";
import useGetProfile from "../../hooks/useGetProfile";
import { Box, LinearProgress } from "@mui/material";

const url = BASE_API + PROFILES_API;

/**
 * ProfilePage component for displaying the user profile.
 * It retrieves the username from local storage and fetches the user data
 * from the API, displaying a loading indicator or error message as needed.
 *
 * @component
 * @example
 * return (
 *   <ProfilePage />
 * )
 */

function ProfilePage() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const urlWithParams = username
    ? `${url}/${username}${EXTRAS_PROFILE_API}`
    : null;

  const { data, isError, isLoading } = useGetProfile(urlWithParams);

  return (
    <Layout>
      {isLoading ? (
        <Box sx={{ width: "50%" }} className="mx-auto mt-5">
          <LinearProgress />
        </Box>
      ) : isError ? (
        <div>Error loading user</div>
      ) : !data ? (
        <div>No user data found.</div>
      ) : (
        <Profile user={data} />
      )}
    </Layout>
  );
}

export default ProfilePage;
