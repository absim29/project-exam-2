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
        <Modal.Title className="first-font">Become a venue manager</Modal.Title>
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
              className="fs-5"
            />
            <p className="fst-italic">
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <MyButton
              type="submit"
              label={loading ? "Registering..." : "Register"}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default VenueManagerModal;
