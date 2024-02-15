import React, { useState } from "react";
import EditNoteForm from "./EditNoteForm";

export default function NotesItem({ note, onEdit, onDelete, date }) {
  const [showForm, setShowForm] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);

  const handleFormSubmit = (updatedNote) => {
    setShowForm(false);
    onEdit(note._id, updatedNote);
  };

  const handleEdit = (note) => {
    setShowForm(true);
    setUpdatedNote(note);
    document.querySelector(".notes-heading").style.display = "none";
    Array.from(document.querySelectorAll(".note-item")).forEach((e) => {
      e.style.display = "none";
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    document.querySelector(".notes-heading").style.display = "flex";
    Array.from(document.querySelectorAll(".note-item")).forEach((e) => {
      e.style.display = "block";
    });
  };

  return (
    <>
      {showForm && (
        <EditNoteForm
          note={updatedNote}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
      <div className={`note-item ${!showForm ? "" : "note-item-none"}`}>
        <div className="note-item-heading">
          <h2>{note.title}</h2>
        </div>
        <div className="note-item-description">
          <p>{note.description}</p>
        </div>
        <div className="note-item-tag">
          <p>{note.tag}</p>
        </div>
        <div className="note-item-date">
          <p>{date}</p>
        </div>
        <div className="notes-item-icon">
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => handleEdit(note)}
          >
          </i>
          <i
            className="fa-solid fa-trash"
            onClick={() => onDelete(note._id)}
          >
          </i>
        </div>
      </div>
    </>
  );
}
