import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          { name, email, password, phoneNumber }
        );
        const userExists = "User already exists!";
        if (response.data.error === userExists) {
          toast.error(userExists);
        } else {
          toast.success("User created successfully!");
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
          toast.error("Internal Server Error!");
        } else if (error.request) {
          console.error("Error:", error.message);
          toast.error("Network Error!");
        } else {
          console.error("Error:", error.message);
          console.log("An unknown error occurred!");
        }
      }
    }

    return (
        <>
        <div className="userForm">
        {/* <!-- Sign up form --> */}
        <div className="sign-up-form">
          <div className="form-heading">
          <h1>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="box">
            <input type="text" name="name" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} required minLength={5}/>
            </div>
            <div className="box">
              <input type="email" name="email" id="email" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="box">
            <input type="number" name="phoneNumber" placeholder="Enter phone number..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required minLength={10} maxLength={15}/>
            </div>
            <div className="box">
              <input type="password" name="password" id="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} required minLength={12} />
            </div>
            <div className="buttons-btn">
              <button className="btn">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
        </>
    );
}
