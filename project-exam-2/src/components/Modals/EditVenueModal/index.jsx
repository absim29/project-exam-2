import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { validateAddVenue } from "../../../functions/AddVenueValidation";
import MyButton from "../../Button";
import useUpdate from "../../../hooks/useUpdate";
import { BASE_API, VENUES_API } from "../../../constants/apiUrl";
import { useParams } from "react-router-dom";

function EditVenueModal({ show, handleClose, venue }) {
  let { id } = useParams();
  const url = `${BASE_API}${VENUES_API}/${id}`;

  // Initialize state with venue data if available
  const initialState = {
    name: venue?.name || "",
    description: venue?.description || "",
    media: venue?.media || [{ url: "", alt: "" }],
    price: venue?.price || 0,
    maxGuests: venue?.maxGuests || 0,
    rating: venue?.rating || 0, // Include rating if needed
    meta: {
      wifi: venue?.meta?.wifi || false,
      parking: venue?.meta?.parking || false,
      breakfast: venue?.meta?.breakfast || false,
      pets: venue?.meta?.pets || false,
    },
    location: {
      address: venue?.location?.address || "",
      city: venue?.location?.city || "",
      zip: venue?.location?.zip || "",
      country: venue?.location?.country || "",
    },
  };

  const {
    userData,
    setUserData,
    loading,
    error,
    validationErrors,
    handleSubmit,
  } = useUpdate(initialState, validateAddVenue, url, "PUT", handleClose);

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
        <Modal.Title className="first-font">Edit Venue</Modal.Title>
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

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="required"
              value={userData.description}
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
              placeholder="required"
              value={userData.price}
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
              value={userData.maxGuests}
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
              value={userData.location.address}
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
              value={userData.location.city}
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
              value={userData.location.zip}
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
              value={userData.location.country}
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
            label={loading ? "Update venue..." : "Update Venue"}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditVenueModal;
