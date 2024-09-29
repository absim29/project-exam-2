import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useRegistrationForm from "../../../hooks/useRegistrationForm";
import { validateForm } from "../../../functions/FormValidation";
import MyButton from "../../Button";
import { Divider } from "@mui/material";

/**
 * RegistrationModal component renders a modal for user registration,
 * including form fields for name, email, password, avatar, bio, and
 * an option to register as a venue manager.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {function} props.handleClose - Function to close the modal
 * @param {function} props.handleOpenLogin - Function to open the login modal
 *
 * @returns {JSX.Element} The rendered RegistrationModal component.
 */

function RegistrationModal({ show, handleClose, handleOpenLogin }) {
  /**
   * Initializes state with empty fields for name, email, password, avatar,
   * bio, and venueManager option.
   *
   * @typedef {Object} RegistrationFormData
   * @property {string} name - The user's name
   * @property {string} email - The user's email address
   * @property {string} password - The user's password
   * @property {Object} avatar - The user's avatar
   * @property {string} avatar.url - The URL for the avatar image
   * @property {string} bio - The user's biography
   * @property {boolean} venueManager - Indicates if the user wants to register
   * as a venue manager
   */

  const initialState = {
    name: "",
    email: "",
    password: "",
    avatar: { url: "" },
    bio: "",
    venueManager: false,
  };

  /**
   * Handles form submission to register the user.
   *
   * @function handleSubmit
   */

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
        <Modal.Title className="first-font">Registration Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>NAME</Form.Label>

            <Form.Control
              type="text"
              placeholder="Your name"
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
              placeholder="Your email"
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
              placeholder="Password"
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
              placeholder="Biography"
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

          <p className="fst-italic">
            By registering, you agree to our Terms of Service and Privacy
            Policy.
          </p>

          <div className="d-flex justify-content-center">
            <MyButton
              type="submit"
              label={loading ? "Registering..." : "Register"}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>

        <Divider className="my-5">OR</Divider>

        <div className="d-flex justify-content-center mb-5">
          <GoogleIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrationModal;
