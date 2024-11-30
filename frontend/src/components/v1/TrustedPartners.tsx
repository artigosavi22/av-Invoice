import React from 'react';
import '../../custom_styling/TrustedPartners.css';

const partnerLogos = [
    '/images/authrized_partners/Adobe.png',
    '/images/authrized_partners/asus.png',
    '/images/authrized_partners/dell.png',
    '/images/authrized_partners/ibm.png',
    '/images/authrized_partners/K7-logo1.png',
    '/images/authrized_partners/Lenovo.png',
    '/images/authrized_partners/mcfree.png',
    '/images/authrized_partners/microsoft.png',
    '/images/authrized_partners/hikvision.jpg',
    '/images/authrized_partners/cloud.jpg',
    '/images/authrized_partners/intel.jpg',
];

const TrustedPartners: React.FC = () => {
  return (
    <div className="trusted-partners-container">
      {/* Title and description */}
      <div className="trusted-partners-card">
        <h2>Certified partners & trusted providers.</h2>
        <p>
          An authorized dealer & distributor for many, an official service partner for several – some of the biggest OEMs (Microsoft, HP, Google, Amazon, Sony & more) trust Sujata when it comes to IT infrastructure, installation, and most importantly, the servicing.
        </p>
        <p>
          We stay true to our promise of 24×7 dependability – earning us trustful, and meaningful partnerships that have stood the test of time.
        </p>
      </div>

      {/* Sliding logos */}
      <div className="logo-slider">
        <div className="logo-track">
          {partnerLogos.map((logo, index) => (
            <img key={index} src={`${logo}`} alt="Partner Logo" className="partner-logo" />
          ))}
          {partnerLogos.map((logo, index) => (
            <img key={index + partnerLogos.length} src={`/assets/${logo}`} alt="Partner Logo" className="partner-logo" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedPartners;
