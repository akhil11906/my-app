import React, { useState } from "react";
import "./ProductDetail.css"; // Import your CSS file

const PropertyHeader = () => (
  <div className="property-header">
    <h1>Spacious 3-Bedroom Apartment</h1>
    <div className="price">$2,500 / Month</div>
  </div>
);

const Gallery = ({ openSlider }) => (
  <div className="gallery">
    <img
      src="https://via.placeholder.com/400x400?text=Living+Room"
      alt="Living Room"
      onClick={() => openSlider(0)}
    />
    <div className="row">
      <img
        src="https://via.placeholder.com/200x200?text=Kitchen"
        alt="Kitchen"
        onClick={() => openSlider(1)}
      />
      <div className="image-container">
        <img
          src="https://via.placeholder.com/200x200?text=Bedroom"
          alt="Bedroom"
          onClick={() => openSlider(2)}
        />
        <div className="overlay image-count" onClick={() => openSlider(3)}>
          + More Images
        </div>
      </div>
    </div>
  </div>
);

const PropertyDetails = () => (
  <div className="property-details">
    <h2>Property Details</h2>
    <table>
      <tbody>
        <tr>
          <th>
            <i className="fas fa-bed"></i> No. of Bedrooms
          </th>
          <td>2</td>
        </tr>
        <tr>
          <th>
            <i className="fas fa-bath"></i> No. of Bathrooms
          </th>
          <td>2</td>
        </tr>
        <tr>
          <th>
            <i className="fas fa-ruler"></i> Size
          </th>
          <td>1,500 sq. ft.</td>
        </tr>
        <tr>
          <th>
            <i className="fas fa-car"></i> Parking
          </th>
          <td>Parking available</td>
        </tr>
        <tr>
          <th>
            <i className="fas fa-wifi"></i> Amenities
          </th>
          <td>Wi-Fi included</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ActionButtons = () => (
  <div className="action-buttons">
    <button className="button owner-details-btn">
      <i className="fas fa-user"></i> Get Owner Details
    </button>
    <button className="button schedule-visit-btn">
      <i className="fas fa-calendar-alt"></i>
      <span className="tooltip-text">Schedule a Visit</span>
    </button>
    <button className="button message-owner-btn">
      <i className="fas fa-comment-alt"></i>
      <span className="tooltip-text">Message Owner</span>
    </button>
  </div>
);

const Overview = () => (
  <div className="overview">
    <h2>Overview</h2>
    <div className="overview-details">
      {[
        { icon: "fas fa-couch", text: "Furnishing Status: Unfurnished" },
        { icon: "fas fa-compass", text: "Facing: Don't Know" },
        { icon: "fas fa-tint", text: "Water Supply: Both" },
        { icon: "fas fa-building", text: "Floor: 1/1" },
        { icon: "fas fa-bath", text: "Bathroom: 1" },
        { icon: "fas fa-utensils", text: "Non-Veg Allowed: Yes" },
        { icon: "fas fa-lock", text: "Gated Security: No" },
      ].map((item, index) => (
        <div className="overview-item" key={index}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const Description = () => (
  <div className="details">
    <h2>Description</h2>
    <p>
      This stunning 3-bedroom apartment is located in the heart of downtown,
      offering easy access to parks, shopping, and public transport...
    </p>
    <p>
      The apartment boasts high-end finishes, including hardwood floors,
      stainless steel appliances, and quartz countertops in the kitchen...
    </p>
  </div>
);

const Amenities = () => (
  <div className="amenities">
    <h2>Amenities</h2>
    <div className="amenities-list">
      {[
        { icon: "fas fa-snowflake", text: "Air Conditioning" },
        { icon: "fas fa-dumbbell", text: "Fitness Center" },
        { icon: "fas fa-swimmer", text: "Swimming Pool" },
        { icon: "fas fa-shield-alt", text: "24/7 Security" },
        { icon: "fas fa-paw", text: "Pet Friendly" },
      ].map((item, index) => (
        <div className="amenity-item" key={index}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const Slider = ({ images, currentImageIndex, setImageIndex, closeSlider }) => (
  <div className="slider-overlay" style={{ display: currentImageIndex !== null ? "flex" : "none" }}>
    <button className="close" onClick={closeSlider}>
      &times;
    </button>
    <div className="navigation">
      <button onClick={() => setImageIndex((currentImageIndex - 1 + images.length) % images.length)}>
        &larr; Prev
      </button>
      <button onClick={() => setImageIndex((currentImageIndex + 1) % images.length)}>Next &rarr;</button>
    </div>
    <img src={images[currentImageIndex]} alt="Slider Image" />
  </div>
);

const RentHouseDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const images = [
    "https://via.placeholder.com/400x400?text=Living+Room",
    "https://via.placeholder.com/200x200?text=Kitchen",
    "https://via.placeholder.com/200x200?text=Bedroom",
  ];

  return (
    <div>
      <header>
        <h1>Rent House Details</h1>
      </header>
      <div className="container">
        <PropertyHeader />
        <div className="property-layout">
          <Gallery openSlider={setCurrentImageIndex} />
          <div className="details">
            <PropertyDetails />
            <ActionButtons />
          </div>
        </div>
        <Overview />
        <Description />
        <Amenities />
      </div>
      <Slider
        images={images}
        currentImageIndex={currentImageIndex}
        setImageIndex={setCurrentImageIndex}
        closeSlider={() => setCurrentImageIndex(null)}
      />
    </div>
  );
};

export default RentHouseDetails;   