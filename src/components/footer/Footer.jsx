import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>We are a company dedicated to providing the best products and services.</p>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: info@example.com</li>
            <li>Phone: +123 456 789</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Your Company | All rights reserved
      </div>
    </footer>
  );
}

export default Footer
