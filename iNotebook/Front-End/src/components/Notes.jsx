import React, { useEffect, useState } from "react";
import NotesItem from "./NotesItem";
import { Link, useNavigate } from "react-router-dom"
import { format } from "date-fns";;
import axios from "axios";
import toast from "react-hot-toast";
import _ from 'lodash';

const axiosInstance = axios.create();


export default function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["auth-token"] = token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );


  const fetchAllNotes = _.debounce(async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/notes/fetchusernotes");
      setNotes(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }, 500);

  useEffect(() => {
    fetchAllNotes();
  }, [])

const handleDelete = async (noteId) => {
    const authToken = localStorage.getItem('authToken');
  
    try {
      await axios.delete(`http://localhost:3000/api/notes/deletenote/${noteId}`, {
        headers: {
          "auth-token": authToken
        }
      });
  
      setNotes(notes.filter((note) => note._id !== noteId));
      toast.success("Note deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Note!");
    }
  };

  const handleEdit = (noteId, updatedNote) => {
    const authToken = localStorage.getItem('authToken')
    axios.put(`http://localhost:3000/api/notes/updatenotes/${noteId}`, updatedNote, {
      headers:{
        "auth-token": authToken 
      }
    })
    .then((res) => {
      setNotes((currentNotes) => 
        currentNotes.map((note) => (note._id === noteId ? res.data : note))
      )
      toast.success("Note Updated Successfully!")
      navigate("/")
      
    })
    .catch(error => {
      console.log(error);
      toast.error("Error Updating Note!");
    });
  }


  return (
    <>
      {localStorage.getItem("authToken") ? (
        <div className="notes">
           <div className="notes-heading">
            <h1>Your Notes</h1>
          </div>
          <div className="notes-item-container">
            {notes.length === 0 ? <div className="no-note-para">
              <p>Currently You have no notes. You need to go to the home page and click on the Add Note button!</p> 
            </div> : notes.map((note) => (
            <NotesItem key={note._id} note={note} date={format(new Date(note.date), "MMMM d, yyyy h:mm a")} noteId={note._id} onDelete={handleDelete} onEdit={handleEdit} onCancel={() => {}}/>
            ))}
          </div>
        </div>

      ) : (
        <div class="notes-section">
          <div class="notes-section-heading">
            <h1>Currently, You have  no notes!</h1>
          </div>
          <div class="notes-section-para">
            <p>
              This app allows you to create, edit and delete your personal notes. All of your data are stored on a server
              so that even if you close the browser or switch devices all your information will be safe. You can also
              share your notebook with others by sharing the login details!
            </p>
          </div>
          <div class="notes-section-btn-container">
            <p>
              You don't have any notes yet. If you have an account, please{" "}
              <Link to="/login">Login</Link>. If not, please <Link to="/signup">Sign Up</Link>!
            </p>
          </div>
        </div>
      )}
    </>
  );
}