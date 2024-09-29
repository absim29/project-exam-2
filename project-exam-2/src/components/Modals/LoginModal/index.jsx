import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useLoginForm from "../../../hooks/useLoginForm";
import { validateForm } from "../../../functions/LoginValidation";
import MyButton from "../../Button";
import { Divider } from "@mui/material";

/**
 * LoginModal component renders a modal for user login, including form fields
 * for email and password, and social login options.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {function} props.handleClose - Function to close the modal
 *
 * @returns {JSX.Element} The rendered LoginModal component.
 */

function LoginModal({ show, handleClose }) {
  /**
   * Initializes state with empty email and password fields.
   *
   * @typedef {Object} LoginFormData
   * @property {string} email - The user's email address
   * @property {string} password - The user's password
   */

  const initialState = {
    email: "",
    password: "",
  };

  /**
   * Handles form submission to log in the user.
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
  } = useLoginForm(initialState, validateForm);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">Welcome back!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          <div className="d-flex justify-content-center mt-4">
            <MyButton
              type="submit"
              label={loading ? "Logging in..." : "LOGIN"}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>

        <Divider className="my-4">OR</Divider>

        <div className="d-flex justify-content-center mb-4">
          <GoogleIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
