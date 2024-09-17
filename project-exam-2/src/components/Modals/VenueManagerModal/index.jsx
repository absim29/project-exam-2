import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BASE_API, PROFILES_API } from "../../../constants/apiUrl";
import useUpdate from "../../../hooks/useUpdate";
import MyButton from "../../Button";

const username = localStorage.getItem("username");
const url = `${BASE_API}${PROFILES_API}/${username}`;

function VenueManagerModal({ show, handleClose, user }) {
  const initialState = {
    venueManager: user.venueManager || false,
  };

  const { userData, setUserData, loading, error, handleSubmit } = useUpdate(
    initialState,
    () => true,
    url,
    "PUT",
    handleClose
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">BECOME VENUE MANAGER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicVenueManager">
            <Form.Check
              type="checkbox"
              label="Register as a Venue Manager"
              checked={userData.venueManager}
              onChange={(e) =>
                setUserData({ ...userData, venueManager: e.target.checked })
              }
            />
          </Form.Group>

          <MyButton
            type="submit"
            label={loading ? "Registering..." : "REGISTER"}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default VenueManagerModal;
