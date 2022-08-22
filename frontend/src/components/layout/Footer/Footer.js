import React from "react";
import "./Footer.css";
import playStore from "../../../images/google.png";
import appStore from "../../../images/playstore.png";
import {SITE_NAME} from "../../../constants/constants"

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>{SITE_NAME}</h1>
        <p>High Quality is Our first priority</p>
        <p>Copyrights 2021 &copy; MohammedAlthaf</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/mohammedalthafpp">Instagram</a>
        <a href="https://github.com/mohammedalthafpp">Youtube</a>
        <a href="https://github.com/mohammedalthafpp">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
