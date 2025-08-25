import React from "react";
import "./Footer.css"; // Create a CSS file for styling

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        We are committed to providing the best healthcare services with top doctors and modern facilities. Book appointments easily and get expert care.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>📍 123 Health Street, Chennai, India</p>
                    <p>📞 +91 98765 43210</p>
                    <p>📧 support@hospitalcare.com</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/doctors">Doctors</a></li>
                        <li><a href="/appointments">Appointments</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        https://facebook.com<br />
                        https://twitter.com<br />
                        https://instagram.com
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 HospitalCare. All rights reserved.</p>
            </div>
        </footer>
    );
}
