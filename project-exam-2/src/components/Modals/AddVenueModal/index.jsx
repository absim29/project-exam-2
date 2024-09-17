import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { validateAddVenue } from "../../../functions/AddVenueValidation";
import MyButton from "../../Button";
import useUpdate from "../../../hooks/useUpdate";
import { BASE_API, VENUES_API } from "../../../constants/apiUrl";

const url = BASE_API + VENUES_API;

function AddVenueModal({ show, handleClose }) {
  const initialState = {
    name: "", // Required
    description: "", // Required
    media: [
      // Optional
      {
        url: "", // URL of the image
        // alt: "", // Alt text for the image
      },
    ],
    price: 0, // Required (default value: 0)
    maxGuests: 0, // Required (default value: 0)
    meta: {
      // Optional
      wifi: false, // Optional (default value: false)
      parking: false, // Optional (default value: false)
      breakfast: false, // Optional (default value: false)
      pets: false, // Optional (default value: false)
    },
    location: {
      // Optional
      address: null, // Optional (default value: null)
      city: null, // Optional (default value: null)
      zip: null, // Optional (default value: null)
      country: null, // Optional (default value: null)
    },
  };

  const {
    userData,
    setUserData,
    loading,
    error,
    validationErrors,
    handleSubmit,
  } = useUpdate(initialState, validateAddVenue, url, "POST", handleClose);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">NEW VENUE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="required"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            {validationErrors.name && (
              <p style={{ color: "red" }}>{validationErrors.name}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="required"
              value={userData.description || ""}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
            />
            {validationErrors.description && (
              <p style={{ color: "red" }}>{validationErrors.description}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMediaUrl">
            <Form.Label>MEDIA</Form.Label>
            <Form.Control
              type="url"
              placeholder="Paste your URL here"
              value={userData.media[0]?.url || ""}
              onChange={(e) => {
                const newMedia = [...userData.media];
                newMedia[0] = { ...newMedia[0], url: e.target.value };
                setUserData({ ...userData, media: newMedia });
              }}
            />
            {validationErrors.mediaUrl && (
              <p style={{ color: "red" }}>{validationErrors.mediaUrl}</p>
            )}
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicMediaAlt">
            <Form.Label>MEDIA ALT TEXT</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.media.alt}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  media: { ...userData.media, alt: e.target.value },
                })
              }
            />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="number"
              placeholder="required"
              value={userData.price || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setUserData({ ...userData, price: isNaN(value) ? "" : value });
              }}
              min="0"
            />
            {validationErrors.price && (
              <p style={{ color: "red" }}>{validationErrors.price}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMaxGuests">
            <Form.Label>MAX GUESTS</Form.Label>
            <Form.Control
              type="number"
              placeholder="required"
              value={userData.maxGuests || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setUserData({
                  ...userData,
                  maxGuests: isNaN(value) ? "" : value,
                });
              }}
              min="0"
            />
            {validationErrors.maxGuests && (
              <p style={{ color: "red" }}>{validationErrors.maxGuests}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>AMENITIES</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                id="metaWifi"
                label="Wi-Fi"
                checked={userData.meta.wifi}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    meta: { ...userData.meta, wifi: e.target.checked },
                  })
                }
              />
              <Form.Check
                type="checkbox"
                id="metaParking"
                label="Parking"
                checked={userData.meta.parking}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    meta: { ...userData.meta, parking: e.target.checked },
                  })
                }
              />
              <Form.Check
                type="checkbox"
                id="metaBreakfast"
                label="Breakfast"
                checked={userData.meta.breakfast}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    meta: { ...userData.meta, breakfast: e.target.checked },
                  })
                }
              />
              <Form.Check
                type="checkbox"
                id="metaPets"
                label="Pets Allowed"
                checked={userData.meta.pets}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    meta: { ...userData.meta, pets: e.target.checked },
                  })
                }
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>ADDRESS</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.location.address || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: { ...userData.location, address: e.target.value },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>CITY</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.location.city || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: { ...userData.location, city: e.target.value },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicZip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.location.zip || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: { ...userData.location, zip: e.target.value },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCountry">
            <Form.Label>COUNTRY</Form.Label>
            <Form.Control
              type="text"
              placeholder="optional"
              value={userData.location.country || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: { ...userData.location, country: e.target.value },
                })
              }
            />
          </Form.Group>

          <MyButton
            type="submit"
            label={loading ? "Adding venue..." : "ADD VENUE"}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddVenueModal;
