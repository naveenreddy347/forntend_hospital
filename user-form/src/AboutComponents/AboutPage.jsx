// File: ./CommonComponents/AboutPage.jsx

import React from 'react';
import './AboutPage.css'; // Optional styling

const services = [
  { title: "Emergency Care", icon: "🚑", description: "24/7 emergency services with expert trauma care." },
  { title: "Outpatient Services", icon: "🩺", description: "Consultations with specialists across departments." },
  { title: "Diagnostics", icon: "🔬", description: "Advanced lab and imaging services." },
  { title: "Surgery", icon: "🏥", description: "State-of-the-art surgical facilities." },
  { title: "Pharmacy", icon: "💊", description: "In-house pharmacy with all essential medications." },
];

const AboutPage = () => (
  <div className="about-page">
    <header className="about-header">
      <h1>Welcome to HospitalCare</h1>
      <p>Compassionate Care, Advanced Medicine, Close to Home.</p>
    </header>

    <section className="about-intro">
      <h2>About Us</h2>
      <p>
        HospitalCare is a multi-specialty healthcare institution committed to providing high-quality medical services with compassion and excellence.
      </p>
    </section>

    <section className="about-services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.icon} {service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="about-why">
      <h2>Why Choose Us?</h2>
      <ul>
        <li>👨‍⚕️ Experienced Doctors</li>
        <li>🏥 Modern Equipment</li>
        <li>❤️ Patient-Centered Care</li>
        <li>💰 Affordable Pricing</li>
      </ul>
    </section>

    <section className="about-contact">
      <h2>Contact & Location</h2>
      <p>📍 123 Health Street, Chennai, Tamil Nadu</p>
      <p>📞 +91 9876513210</p>
      <p>📧 contact@hospitalcare.in</p>
    </section>
  </div>
);

export default AboutPage;
