import React from "react";
import MyButton from "../Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function LoginModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">WELCOME BACK</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label first-font">
              EMAIL
            </label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label first-font">
              PASSWORD
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <MyButton type="submit" label="LOGIN" />
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
