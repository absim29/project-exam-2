import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import MyButton from "../../Button";
import { API_KEY, BASE_API, VENUES_API } from "../../../constants/apiUrl";
import { useNavigate, useParams } from "react-router-dom";

function DeleteVenueModal({ show, handleClose, venue }) {
  const { id } = useParams();
  const url = `${BASE_API}${VENUES_API}/${id}`;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete the venue.");
      }

      handleClose();
      navigate("/venues");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">DELETE VENUE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Are you sure you want to delete?</h1>
        <p>This action cannot be undone</p>
        <MyButton
          onClick={handleDelete}
          label={loading ? "Deleting..." : "DELETE VENUE"}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal.Body>
    </Modal>
  );
}

export default DeleteVenueModal;
