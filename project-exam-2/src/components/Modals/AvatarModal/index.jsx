import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BASE_API, PROFILES_API } from "../../../constants/apiUrl";
import useUpdate from "../../../hooks/useUpdate";
import { validateAvatar } from "../../../functions/AvatarValidation";
import MyButton from "../../Button";

const username = localStorage.getItem("username");
const url = `${BASE_API}${PROFILES_API}/${username}`;

function AvatarModal({ show, handleClose, user }) {
  const initialState = {
    avatar: user.avatar || { url: "" },
    bio: user.bio || "",
  };

  const {
    userData,
    setUserData,
    loading,
    error,
    validationErrors,
    handleSubmit,
  } = useUpdate(initialState, validateAvatar, url, "PUT", handleClose);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicBio">
            <Form.Label>BIO</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="optional"
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
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
          <div className="d-flex justify-content-center">
            <MyButton
              type="submit"
              label={loading ? "Updating..." : "Update Profile"}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AvatarModal;
