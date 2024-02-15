import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password }
      );
      const invalidEmailOrPassword = "Invalid email or password!";
      const userNotFound = "User not found!";
      if (response.data.error === invalidEmailOrPassword) {
        toast(invalidEmailOrPassword);
      } else if (response.data.error === userNotFound) {
        toast.error(userNotFound);
        navigate("/signup");
      } else {
        const authToken = await response.data.authToken;
        localStorage.setItem("authToken", authToken);
        toast.success("User Logged In Successfully!");
        navigate("/notes");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Internal Server Error!");
        navigate("/");
      } else if (error.request) {
        toast.error("Network Error!");
        navigate("/");
      } else {
        console.log("An unknown error occurred!");
        navigate("/");
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <>
      <div className="userForm">
        {/* <!-- Sign in form --> */}
        <div className="sign-in-form" id="sign-in-form">
          <div className="form-heading">
            <h1>Sign In</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="box">
              <i className="fa-solid fa-user"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="box">
              <i
                className={`fa-solid fa-key ${
                  passwordVisible ? "password-visible" : ""
                }`}
                id="passwordTypeChanger"
                onClick={togglePasswordVisibility}
              ></i>
              <input
                type={passwordVisible ? "text" : "password"}
                name="sign_in_password"
                id="sign_in_password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={12}
              />
            </div>
            <div className="buttons-btn">
              <button className="btn" id="sign_in">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
