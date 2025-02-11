import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.css"; // Keep your CSS styles

const RentHouseDetails = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const navigate = useNavigate();

  if (!property) {
    return (
      <div>
        <h2>No property data found.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Rent House Details</h1>
      </header>
      <div className="container">
        <div className="property-header">
          <h1>{property.propertyName}</h1>
          <div className="price">{property.price || "$ N/A"}</div>
        </div>

        <div className="property-layout">
          {/* Dynamic Image Gallery */}
          <div className="gallery">
            {property.images.map((src, index) => (
              <img key={index} src={URL.createObjectURL(src)} alt={`Property Image ${index + 1}`} onClick={() => setCurrentImageIndex(index)} />
            ))}
          </div>

          <div className="details">
            <div className="property-details">
              <h2>Property Details</h2>
              <table>
                <tbody>
                  <tr>
                    <th><i className="fas fa-bed"></i> No. of Bedrooms</th>
                    <td>{property.bedrooms}</td>
                  </tr>
                  <tr>
                    <th><i className="fas fa-bath"></i> No. of Bathrooms</th>
                    <td>{property.bathrooms}</td>
                  </tr>
                  <tr>
                    <th><i className="fas fa-ruler"></i> Size</th>
                    <td>{property.size} sq. ft.</td>
                  </tr>
                  <tr>
                    <th><i className="fas fa-car"></i> Parking</th>
                    <td>{property.parking}</td>
                  </tr>
                  <tr>
                    <th><i className="fas fa-wifi"></i> Amenities</th>
                    <td>{property.amenities}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="action-buttons">
              <button className="button owner-details-btn"><i className="fas fa-user"></i> Get Owner Details</button>
              <button className="button schedule-visit-btn"><i className="fas fa-calendar-alt"></i> Schedule a Visit</button>
              <button className="button message-owner-btn"><i className="fas fa-comment-alt"></i> Message Owner</button>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="overview">
          <h2>Overview</h2>
          <div className="overview-details">
            {[
              { icon: "fas fa-couch", text: `Furnishing Status: ${property.furnishingStatus}` },
              { icon: "fas fa-compass", text: `Facing: ${property.facing}` },
              { icon: "fas fa-tint", text: `Water Supply: ${property.waterSupply}` },
              { icon: "fas fa-building", text: `Floor: ${property.floor}` },
              { icon: "fas fa-bath", text: `Bathrooms: ${property.bathrooms}` },
              { icon: "fas fa-utensils", text: `Non-Veg Allowed: ${property.nonVegAllowed}` },
              { icon: "fas fa-lock", text: `Gated Security: ${property.gatedSecurity}` },
            ].map((item, index) => (
              <div className="overview-item" key={index}>
                <i className={item.icon}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="details">
          <h2>Description</h2>
          <p>{property.description}</p>
        </div>

        {/* Amenities Section */}
        <div className="amenities">
          <h2>Amenities</h2>
          <div className="amenities-list">
            {property.amenities.split(",").map((amenity, index) => (
              <div className="amenity-item" key={index}>
                <i className="fas fa-check"></i>
                <span>{amenity.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Slider */}
      {currentImageIndex !== null && (
        <div className="slider-overlay">
          <button className="close" onClick={() => setCurrentImageIndex(null)}>&times;</button>
          <div className="navigation">
            <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + property.images.length) % property.images.length)}>&larr; Prev</button>
            <button onClick={() => setCurrentImageIndex((currentImageIndex + 1) % property.images.length)}>Next &rarr;</button>
          </div>
          <img src={URL.createObjectURL(property.images[currentImageIndex])} alt="Slider Image" />
        </div>
      )}
    </div>
  );
};

export default RentHouseDetails;
