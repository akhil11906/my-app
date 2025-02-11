import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [propertyName, setPropertyName] = useState("");
  const [houseImage, setHouseImage] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [bedroomImage, setBedroomImage] = useState(null);
  const [bathroomImage, setBathroomImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleMultipleFiles = (e) => {
    setAdditionalImages(Array.from(e.target.files)); // Store all selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!propertyName) {
      setMessage("❌ Property name is required!");
      return;
    }

    const formData = new FormData();
    formData.append("propertyName", propertyName);
    if (houseImage) formData.append("houseImage", houseImage);
    if (roomImage) formData.append("roomImage", roomImage);
    if (bedroomImage) formData.append("bedroomImage", bedroomImage);
    if (bathroomImage) formData.append("bathroomImage", bathroomImage);

    // ✅ Append Multiple Additional Images
    additionalImages.forEach((image, index) => {
      formData.append(`additionalImages`, image);
    });

    try {
      const response = await axios.post("http://localhost:5000/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`✅ ${response.data.message}`);
      console.log("Uploaded images:", response.data);
    } catch (error) {
      console.error("❌ Error uploading images:", error);
      setMessage("❌ Failed to upload images. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Upload Property Images</h2>
      <form onSubmit={handleSubmit}>
        <label>Property Name:</label>
        <input type="text" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} required />

        <label>House Image (Required):</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setHouseImage)} required />

        <label>Room Image:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setRoomImage)} />

        <label>Bedroom Image:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBedroomImage)} />

        <label>Bathroom Image:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBathroomImage)} />

        <label>Additional Images (Multiple Allowed):</label>
        <input type="file" accept="image/*" multiple onChange={handleMultipleFiles} />

        <button type="submit" onClick={() => navigate("/view-images")}>Upload</button>
      </form>

      {/* <button onClick={() => navigate("/view-images")}>View Uploaded Images</button> */}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploadForm;
