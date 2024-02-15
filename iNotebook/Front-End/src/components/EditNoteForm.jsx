import React, { useState } from "react";
export default function NoteForm({ note, onSubmit, onCancel }) {
  const [title, setTitle] = useState(note.title || "");
  const [description, setDescription] = useState(note.description || "");
  const [tag, setTag] = useState(note.tag || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, tag });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="edit-note-container">
      <div className="edit-note-heading">
        <h1>Edit a Note</h1>
      </div>
      <div className="edit-note-form-container">
        <form className="edit-note-form" onSubmit={handleSubmit}>
          <div className="edit-note-form-box">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="edit-note-form-box">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="edit-note-form-box">
            <input
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
          </div>
          <div className="edit-note-btn-container">
            <button className="edit-note-btn" type="submit">
              Update Note
            </button>
            <button className="edit-note-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}