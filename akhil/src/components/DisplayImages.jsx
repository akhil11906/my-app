import React, { useState } from "react";
import axios from "axios";

const ViewImages = () => {
  const [propertyName, setPropertyName] = useState("");
  const [fetchedPropertyName, setFetchedPropertyName] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchImages = async () => {
    if (!propertyName) {
      setMessage("❌ Enter a property name!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/get-images/${propertyName.trim().replace(/\s+/g, "_")}`);
      setFetchedPropertyName(response.data.propertyName); // ✅ Set property name
      setImages(response.data.images);
      setMessage("");
    } catch (error) {
      setFetchedPropertyName("");
      setImages([]);
      setMessage("❌ No images found for this property.");
    }
  };

  return (
    <div>
      <h2>View Uploaded Property</h2>
      <input 
        type="text" 
        placeholder="Enter Property Name" 
        value={propertyName} 
        onChange={(e) => setPropertyName(e.target.value)}
      />
      <button onClick={fetchImages}>Get Property Details</button>

      {message && <p>{message}</p>}

      {fetchedPropertyName && <h3>🏡 Property Name: {fetchedPropertyName}</h3>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
        {images.map((image, index) => (
          <img key={index} src={`http://localhost:5000${image}`} alt={`Property ${index}`} width="200px" />
        ))}
      </div>
    </div>
  );
};

export default ViewImages;
