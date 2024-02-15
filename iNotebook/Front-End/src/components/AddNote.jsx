import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      if (authToken) {
        if (description.length < 8 && description.length > 0) {
          toast.error("Description should be at least 8 characters long.");
          return;
        }
      }
      const response = await axios.post(
        "http://localhost:3000/api/notes/addusernotes",
        { title, description, tag },
        {
          headers: {
            "auth-token": `${authToken}`,
          },
        }
      );

      const noteResponseSuccess = "Note added Successfully!";
      if (response.data.message === noteResponseSuccess) {
        console.log(noteResponseSuccess);
        toast.success(noteResponseSuccess);
        setTimeout(() => {
          navigate("/notes");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while adding a note!");
      setTimeout(() => {
        navigate("/notes");
      }, 1500);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {localStorage.getItem("authToken") ? (
        <>
          <div className="addnote">
            <div className="addnote-heading">
              <h1>Add a Note</h1>
            </div>
            <div className="addnote-form">
              <form onSubmit={handleFormSubmit}>
                <div className="addnote-form-box">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    required
                    minLength={5}
                  />
                </div>
                <div className="addnote-form-box">
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    cols="30"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write description..."
                    required
                    minLength={8}
                  ></textarea>
                </div>
                <div className="addnote-form-box">
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter tag..."
                    required
                    minLength={5}
                  />
                </div>
                <div className="addnote-btn-container">
                  <button className="addnote-btn" type="submit">
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
