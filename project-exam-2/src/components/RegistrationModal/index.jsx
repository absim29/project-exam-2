import React from "react";
import MyButton from "../Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function RegistrationModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">REGISTRATION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>NAME</Form.Label>
            <Form.Control type="text" placeholder="required" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>EMAIL</Form.Label>
            <Form.Control type="email" placeholder="required" />
            <Form.Text className="text-muted">
              Please use a @noroff email.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control type="password" placeholder="required" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>AVATAR</Form.Label>
            <Form.Control type="url" placeholder="optional" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBio">
            <Form.Label>BIO</Form.Label>
            <Form.Control type="text" placeholder="optional" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="REGISTER AS A VENUE MANAGER" />
          </Form.Group>
          <MyButton type="submit" label="SIGN UP" />
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
