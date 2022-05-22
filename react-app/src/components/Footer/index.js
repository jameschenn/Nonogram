import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-div">
        <h3>Created by James Chen</h3>
        <a href="https://www.linkedin.com/in/jameschenn"><i class="socials fa-brands fa-linkedin fa-flip"></i></a>
        <a href="https://github.com/jameschenn"><i class="socials fa-brands fa-github fa-flip"></i></a>
      </div>
    </footer>
  )
}

export default Footer;
