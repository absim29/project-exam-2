import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import { BASE_API, LOGIN_API, VENUE_MANAGER } from "../../../constants/apiUrl";
import useLoginForm from "../../../hooks/useLoginForm";
import { validateForm } from "../../../functions/FormValidation";
import MyButton from "../../Button";

// const url = BASE_API + LOGIN_API + VENUE_MANAGER;

function LoginModal({ show, handleClose }) {
  const initialState = {
    email: "",
    password: "",
  };

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
        <Modal.Title className="first-font">WELCOME BACK</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <MyButton type="submit" label={loading ? "Logging in..." : "LOGIN"} />

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

export default LoginModal;
