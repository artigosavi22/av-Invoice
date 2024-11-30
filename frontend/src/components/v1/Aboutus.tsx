import React from 'react';
import '../../custom_styling/AboutUs.css';

const Aboutus: React.FC = () => {
  return (
    <section className="about-us">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          For 25+ years now, Sujata has been providing IT infrastructure, consulting & peripherals to companies of all scales & sizes.
        </p>
        <p>
          Experience, expertise, and engineering find harmony at Sujata, enabling us to devise and employ solutions that empower our clients’ business. With multiple business operations to look into, our clients have one less thing to worry about when Sujata looks after everything related to IT – whether that is hardware, software, peripheral assets, or the after-servicing.
        </p>
        <button className="know-more-button">KNOW MORE</button>
      </div>

      <div className="why-sujata">
        <h3>Why Sujata?</h3>
        <ul>
          <li>
            <strong>Legacy:</strong> Customer relations at Sujata have only strengthened as our service has remained steadily top-notch, conforming to our 20+ years legacy.
          </li>
          <li>
            <strong>Service & Support:</strong> We provide exceptional after-sales service to ensure client satisfaction.
          </li>
          <li>
            <strong>Expertise:</strong> Decades of experience allow us to deliver the most efficient solutions.
          </li>
          <li>
            <strong>Vendor-Neutral:</strong> We offer unbiased solutions tailored to your needs, regardless of the vendor.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Aboutus;
