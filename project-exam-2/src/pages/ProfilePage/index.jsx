import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Spinner } from "react-bootstrap";
import { BASE_API, PROFILES_API } from "../../constants/apiUrl";
import Profile from "../../components/Profile";
import useGetProfile from "../../hooks/useGetProfile";

const url = BASE_API + PROFILES_API;

function ProfilePage() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const { data, isError, isLoading } = useGetProfile(url, username);

  return (
    <Layout>
      {isLoading ? (
        <Spinner animation="border" role="status" className="text-black">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
