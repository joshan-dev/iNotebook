import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      toast.error("Please login first!");
      return navigate("/login", { replace: true });
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/userContact",
        { name, email, phoneNumber, description },
        { headers: { "auth-token": authToken } }
      );
      const userContactSuccess = "User Contact Successfully!";
      if (response.data.message === userContactSuccess) {
        toast.success(userContactSuccess);
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
  };

  return (
    <div className="contact-container">
      <div className="contact-heading">
        <h1>Contact Us</h1>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-box">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-box">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-box">
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phoneNumber..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-box">
          <textarea
            id="description"
            name="description"
            placeholder="Write your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="contact-form-btn-container">
          <button className="contact-form-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}