import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home-heading">
          <h1>iNotebook</h1>
          <div className="home-para">
            <p>Introducing the latest innovation in note-taking technology - a cutting-edge digital notebook designed to capture all your thoughts, musings, and brilliant ideas in one convenient and easy-to-use device!</p>
          </div>
          <div className="home-link-container">
            <Link to="/addnote" className="home-link">Add a Note</Link>
          </div>
        </div>
      </div>
      <div className="intro-section">
        <div className="intro-section-heading">
          <h1>Welcome to INotebook App 💡</h1>
        </div>
        <div className="intro-section-para">
          <p>Welcome to INotebook App, your one-stop solution for saving, editing, and accessing your notes from anywhere in the world. With our powerful cloud-based platform, you can effortlessly create, manage, and organize your notes, making it easy to jot down ideas, save important information, and access them whenever you need, from any device. Our user-friendly interface and seamless syncing capabilities ensure a smooth and enjoyable note-taking experience. Join us today and experience the freedom of having your notes at your fingertips, always. Happy note-taking!</p>
        </div>

        <div className="intro-section-heading">
          <h1>Professional Note-Taking Experience 🌟</h1>
        </div>
        <div className="intro-section-para">
          <p>INotebook App is designed to provide you with a professional note-taking experience. Our user-friendly interface and advanced features ensure that you can efficiently create, manage, and access your notes. Our secure and reliable cloud storage ensures that your notes are always safe and accessible. We are dedicated to providing you with the best possible note-taking experience, and we are excited to have you as a part of our community.</p>
        </div>
        <div className="intro-section-heading">
          <h1>Unlimited Notes and Storage 📚</h1>
        </div>
        <div className="intro-section-para">
          <p>Our unlimited storage and note-creation capabilities allow you to store and manage an unlimited number of notes. Whether you're a student jotting down class notes, a professional organizing work-related tasks, or a writer keeping track of your ideas, INotebook App has you covered. With our user-friendly interface, you can easily create, edit, and delete notes, ensuring your notes are always up-to-date and organized.</p>
        </div>
        <div className="intro-section-heading">
          <h1>Secure and Reliable 🔒</h1>
        </div>
        <div className="intro-section-para">
          <p>Your notes are our priority, and we take security and reliability seriously. We use advanced encryption algorithms to securely store your notes in the cloud. Our robust infrastructure ensures that your notes are always available, even during network outages or server downtime. With INotebook App, you can rest assured that your notes are safe and accessible, whenever and wherever you need them.</p>
        </div>
        <div className="intro-section-heading">
          <h1>Thanks for Choosing INotebook App 🙌</h1>
        </div>
        <div className="intro-section-para">
          <p>We are thrilled to have you as a part of our growing community of note-lovers. We are committed to providing you with the best possible note-taking experience, and we are constantly working to improve and expand our platform. We hope you enjoy using INotebook App as much as we enjoy building it. Thank you for choosing us, and we look forward to helping you capture and organize your thoughts.</p>
        </div>
      </div>
    </>
  );
}
