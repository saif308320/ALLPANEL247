import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/home");
  };

  const handleDemoLogin = () => {
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="main">

        {/* LOGO */}
        <div className="logo-login">
          <img src="./image/header-logo.png" alt="logo" />
        </div>

        {/* LOGIN BOX */}
        <div className="login-box">

          {/* TITLE */}
          <div className="title">
            LOGIN
            <img src="./image/hand-finger-pointing-down.png" alt="point" className="title-icon" />
          </div>

          {/* USERNAME */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="icon-box">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="icon-box">
              <i className="fa-solid fa-key"></i>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button className="btn" onClick={handleLogin}>
            Login
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>

          {/* DEMO LOGIN BUTTON */}
          <button className="btn" onClick={handleDemoLogin}>
            Login with demo ID
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>

          {/* DOWNLOAD APK */}
          <div className="download">
            <a href="#">
              <span className="android-icon">
                <span className="android-head">
                  <span className="android-eye android-eye-left"></span>
                  <span className="android-eye android-eye-right"></span>
                  <span className="android-antenna android-antenna-left"></span>
                  <span className="android-antenna android-antenna-right"></span>
                  <span className="android-arm android-arm-left"></span>
                  <span className="android-arm android-arm-right"></span>
                </span>
              </span>
              Download APK
            </a>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">24X7 Support</div>
    </div>
  );
};

export default Login;