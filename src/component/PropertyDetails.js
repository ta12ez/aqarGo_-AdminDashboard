import React from "react";
import { useLocation } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const location = useLocation();
  const { property } = location.state || {}; // استرجاع object من state

  if (!property) return <p>لا توجد بيانات لهذا العقار.</p>;

  return (
    <div className="property-details-container">
      <div className="property-image-section">
        <img
          src={property.images?.[0]?.image_path || "https://via.placeholder.com/400x300"}
          alt={property.title}
          className="property-image"
        />
      </div>
      <div className="property-info-section">
        <div className="property-title">{property.title}</div>
        <div className="property-description">{property.description_property}</div>

        <div className="property-details-list">
          <div>
            <span className="detail-label">السعر:</span>
            <span className="detail-value">{property.price.toLocaleString()} ر.س</span>
          </div>
          <div>
            <span className="detail-label">المساحة:</span>
            <span className="detail-value">{property.space} م²</span>
          </div>
          <div>
            <span className="detail-label">الموقع:</span>
            <span className="detail-value">{property.description_location}</span>
          </div>
          <div>
            <span className="detail-label">الحالة:</span>
            <span className="detail-value">{property.contract_type}</span>
          </div>
          <div>
            <span className="detail-label">الناشر:</span>
            <span className="detail-value">
              {property.user?.FirstName} {property.user?.LastName}
            </span>
          </div>
          <div>
            <span className="detail-label">البريد الإلكتروني:</span>
            <span className="detail-value">
              {property.user?.email}
            </span>
          </div>
          <div>
            <span className="detail-label">الهاتف:</span>
            <span className="detail-value">
              {property.user?.PhoneNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
