import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import { BASE_API, REGISTER_API } from "../../../constants/apiUrl";
import useRegistrationForm from "../../../hooks/useRegistrationForm";
import { validateForm } from "../../../functions/FormValidation";
import MyButton from "../../Button";

// const url = BASE_API + REGISTER_API;

function RegistrationModal({ show, handleClose, handleOpenLogin }) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    avatar: { url: "" },
    bio: "",
    venueManager: false,
  };
  const {
    userData,
    setUserData,
    loading,
    error,
    validationErrors,
    handleSubmit,
  } = useRegistrationForm(initialState, validateForm, handleOpenLogin);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">REGISTRATION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="required"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            {validationErrors.name && (
              <p style={{ color: "red" }}>{validationErrors.name}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>EMAIL</Form.Label>
            <Form.Control
              type="email"
              placeholder="required"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            {validationErrors.email && (
              <p style={{ color: "red" }}>{validationErrors.email}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="required"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {validationErrors.password && (
              <p style={{ color: "red" }}>{validationErrors.password}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAvatarUrl">
            <Form.Label>AVATAR</Form.Label>
            <Form.Control
              type="url"
              placeholder="Paste your URL here"
              value={userData.avatar.url}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  avatar: { ...userData.avatar, url: e.target.value },
                })
              }
            />
            {validationErrors.avatarUrl && (
              <p style={{ color: "red" }}>{validationErrors.avatarUrl}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBio">
            <Form.Label>BIO</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
            {validationErrors.bio && (
              <p style={{ color: "red" }}>{validationErrors.bio}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="REGISTER AS A VENUE MANAGER"
              value={userData.venueManager}
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
        <div className="d-flex justify-content-center">
          <p>-</p>
          <p>OR</p>
          <p>-</p>
        </div>
        <div className="d-flex justify-content-center">
          <GoogleIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrationModal;
