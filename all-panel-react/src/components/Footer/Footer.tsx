import React, { useState } from "react";
import "./Footer.css";

const Over18Popup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="ft-overlay" onClick={onClose}>
      <div className="ft-popup" onClick={e => e.stopPropagation()}>
        <div className="ft-popup-header">
          <span>allpanel247.com</span>
          <button className="ft-popup-close" onClick={onClose}>&#10005;</button>
        </div>
        <div className="ft-popup-body">
          <div className="ft-popup-18icon">18+</div>
          <p className="ft-popup-bold">Over 18s only</p>

          <p>It is an offence for anyone under the age of 18 to open an account or to gamble on allpanel247.com. allpanel247.com takes its age-verification responsibilities very seriously. We carry out age-verification checks on all customers who use payment mechanisms which are available to under 18s and additionally perform random age-verification checks on customers using other forms of funding mechanisms. We may ask for information to verify your age and could restrict or suspend your account until your age is confirmed.</p>

          <p>PLEASE NOTE THAT ANYONE UNDER THE AGE OF 18 YEARS OLD FOUND TO BE USING THIS SITE WILL HAVE ANY WINNINGS FORFEITED AND MAY ALSO BE REPORTED TO THE POLICE.</p>

          <p className="ft-popup-bold">Filtering systems</p>

          <p>allpanel247.com advises and encourages its customers to prevent minors from accessing gambling websites.</p>

          <p>Filtering solutions allow parents to regulate access to the internet, based on chosen criteria. Parents can use filters to prevent their children from accessing, amongst other things, gambling websites. Because our pages are 'labelled', filtering solutions being used to prevent gambling access are able to detect our site content, and block our pages. If you share your computer with friends or family who are under the legal age to register or bet with our site, please consider parental filtering solutions such as:</p>

          <p>Net Nanny™ <a href="https://www.netnanny.com/" target="_blank" rel="noreferrer" className="ft-popup-link">www.netnanny.com</a></p>
          <p>CyberPatrol <a href="https://www.cyberpatrol.com/" target="_blank" rel="noreferrer" className="ft-popup-link">www.cyberpatrol.com</a></p>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <footer className="footer-root">
      {showPopup && <Over18Popup onClose={() => setShowPopup(false)} />}

      <div className="ft-support">24X7 Support</div>
      <div className="ft-bottom">
        <div className="ft-secure">
          <div className="ft-shield">
            <img src="/image/Secure.png" alt="Secure SSL" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="ft-stxt">
            <div className="t1">100% SAFE</div>
            <p>Protected connection and encrypted data.</p>
          </div>
        </div>
        <div className="ft-logos">
          <div className="ftlc" onClick={() => setShowPopup(true)} title="Over 18s only">
            <img src="/image/footericon1.png" alt="18+" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="ftlc" onClick={() => window.open('https://www.gamcare.org.uk/', '_blank')} title="GamCare">
            <img src="/image/footericon2.png" alt="GamCare" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="ftlc" onClick={() => window.open('https://gamblingtherapy.org/', '_blank')} title="Gambling Therapy">
            <img src="/image/footericon3.png" alt="GT" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        </div>
      </div>
      <div className="ft-copy">&copy; Copyright 2026. All Rights Reserved. Powered by ALLPANEL247.</div>
    </footer>
  );
};

export default Footer;