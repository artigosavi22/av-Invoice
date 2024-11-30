import React from 'react';
import '../../custom_styling/ProductFeature.css'; // For custom styles

const ProductFeature: React.FC = () => {
  return (
    <div className="feature-container">
      <div className="image-container">
        <img
          src="/images/slider_image1.jpg" // Replace with the actual image or use the appropriate source path
          alt="Laptop or tablet"
        />
      </div>
      <div className="content-container">
        <h3>Sujata is now</h3>
        <h1>A click away</h1>
        <p>
          Every step ahead at Sujata is a result of our motivation – to ensure 100% client convenience and service.
          That's why, Sujata is now online. Our e-store is open at all times, whether you want to browse, or buy.
        </p>
        <p>
          <strong>Lesser barriers, easier to reach – Sujata is now, just a click away.</strong>
        </p>
      </div>
    </div>
  );
};

export default ProductFeature;
