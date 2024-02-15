import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState("Sign In");
  const [isLocation, setIsLocation] = useState("/login");

  const navigate = useNavigate();

  const toggleNavbar = () => {
    const nav = document.getElementById("nav");
    const nav__list = document.getElementById("nav__list");
    nav__list.classList.toggle("hide");
    nav.classList.toggle("nav_resp");
  };

  const handleLogin = () => {
    if (isLogin === "Sign In") {
      setIsLogin("Sign Up");
      setIsLocation("/signup");
    } else {
      setIsLogin("Sign In");
      setIsLocation("/login");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    toast.success("Signing Out Successfully!");
    navigate("/");
  };
  return (
    <header>
      <nav className="nav" id="nav">
        <div className="logo">
          <Link className="nav_heading" to="/">
            <img
              src="https://files.logomakr.com/99FXrt-LogoMakr.png"
              alt="LOGO"
            />
          </Link>
        </div>
        <div>
          <ul className="nav__list" id="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/notes" className="nav__link">
                Notes
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/contact" className="nav__link">
                Contact
              </Link>
            </li>
            
          </ul>
        </div>

        <div className="ham__burger" onClick={toggleNavbar} id="ham__burger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="nav-login-signup-container">
          {localStorage.getItem("authToken") ? (
            <button onClick={handleSignOut} className="nav-login">
              Sign Out
            </button>
          ) : (
            <Link to={isLocation} onClick={handleLogin} className="nav-login">
              {isLogin}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
