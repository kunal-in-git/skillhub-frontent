import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          {/* Section 1 */}
          <div className="footer-left">
            <div className="footer-column">
              <img src={Logo} alt="Company Logo" className="footer-logo" />
              <h1 className="footer-title">Company</h1>
              <div className="footer-links">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div key={i} className="footer-link">
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="footer-icons">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className="footer-column">
              <h1 className="footer-title">Resources</h1>
              <div className="footer-links">
                {Resources.map((ele, index) => (
                  <div key={index} className="footer-link">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
              <br></br>
              <br></br>
              <h1 className="footer-title">Support</h1>
              <div className="footer-link">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="footer-column">
              <h1 className="footer-title">Plans</h1>
              <div className="footer-links">
                {Plans.map((ele, index) => (
                  <div key={index} className="footer-link">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
              <br></br>
              <br></br>
              <h1 className="footer-title">Community</h1>
              <div className="footer-links">
                {Community.map((ele, index) => (
                  <div key={index} className="footer-link">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="footer-right">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="footer-column">
                <h1 className="footer-title">{ele.title}</h1>
                <div className="footer-links">
                  {ele.links.map((link, index) => (
                    <div key={index} className="footer-link">
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-links">
          {BottomFooter.map((ele, i) => (
            <div key={i} className="footer-bottom-link">
              <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
