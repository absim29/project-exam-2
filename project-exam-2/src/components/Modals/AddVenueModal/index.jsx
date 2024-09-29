import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { validateAddVenue } from "../../../functions/AddVenueValidation";
import MyButton from "../../Button";
import useUpdate from "../../../hooks/useUpdate";
import { BASE_API, VENUES_API } from "../../../constants/apiUrl";

/**
 * AddVenueModal component allows users to add a new venue.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {function} props.handleClose - Function to close the modal
 *
 * @returns {JSX.Element} The rendered AddVenueModal component.
 */

const url = BASE_API + VENUES_API;

function AddVenueModal({ show, handleClose }) {
  const initialState = {
    name: "",
    description: "",
    media: [
      {
        url: "",
      },
    ],
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: null,
      city: null,
      zip: null,
      country: null,
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

  // Function to handle media input change
  const handleMediaChange = (index, e) => {
    const newMedia = [...userData.media];
    newMedia[index].url = e.target.value;
    setUserData({ ...userData, media: newMedia });
  };

  // Function to add a new media input field
  const addMediaField = () => {
    setUserData({
      ...userData,
      media: [...userData.media, { url: "" }],
    });
  };

  // Function to remove a media input field
  const removeMediaField = (index) => {
    const newMedia = userData.media.filter((_, i) => i !== index);
    setUserData({ ...userData, media: newMedia });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="first-font">Add a new venue</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>NAME</Form.Label>

            <Form.Control
              type="text"
              placeholder="Venue name"
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
              placeholder="Venue description"
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

            {userData.media.map((mediaItem, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="url"
                  placeholder={`Image URL ${index + 1}`}
                  value={mediaItem.url}
                  onChange={(e) => handleMediaChange(index, e)}
                />
                {validationErrors.mediaUrl && (
                  <p style={{ color: "red" }}>{validationErrors.mediaUrl}</p>
                )}
                {/* Show remove button if there's more than one media */}
                {userData.media.length > 1 && (
                  <MyButton
                    type="button"
                    label="Remove"
                    onClick={() => removeMediaField(index)}
                  />
                )}
              </div>
            ))}
            <MyButton type="button" label="Add Image" onClick={addMediaField} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>PRICE</Form.Label>

            <Form.Control
              type="number"
              placeholder="Price"
              value={userData.price || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value <= 10000) {
                  setUserData({
                    ...userData,
                    price: isNaN(value) ? "" : value,
                  });
                }
              }}
              min="0"
              max="10000"
            />
            {validationErrors.price && (
              <p style={{ color: "red" }}>{validationErrors.price}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMaxGuests">
            <Form.Label>MAX GUESTS</Form.Label>

            <Form.Control
              type="number"
              placeholder="Maximum guests"
              value={userData.maxGuests || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value <= 100) {
                  setUserData({
                    ...userData,
                    maxGuests: isNaN(value) ? "" : value,
                  });
                }
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
              placeholder="Street no."
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
              placeholder="City"
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
            <Form.Label>ZIP CODE</Form.Label>

            <Form.Control
              type="text"
              placeholder="Zip code"
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
              placeholder="Country"
              value={userData.location.country || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  location: { ...userData.location, country: e.target.value },
                })
              }
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <MyButton
              type="submit"
              label={loading ? "Adding venue..." : "Add Venue"}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddVenueModal;
