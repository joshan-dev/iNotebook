const express = require("express");
const { body, validationResult} = require("express-validator");
const fetchUserDetails = require ("../middleWare/UserDetails");
const notesDB = require("../models/Notes");

// initializing our Routes!
const router = express.Router();

const validateFormData =  [
  body("title").isLength({ min: 5 }).notEmpty().withMessage("Title is required"),
  body("description").isLength({ min: 8 })
    .notEmpty()
    .withMessage("Description is required. It must be at least 8 characters long!"),
]

// Add Note using Post request!
router.post(
  "/addusernotes",
  fetchUserDetails,validateFormData,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new notesDB({
        user: req.authData,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });

      await note.save();
      res.status(201).json({ message: "Note added Successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while adding note in the database!",
      });
    }
  }
);

// Fetch Note using Get request!
router.get("/fetchusernotes", fetchUserDetails, async (req, res) => {
  try {
    const userID = req.authData;
    const userNotes = await notesDB.find({ user: userID });
    res.send(userNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Update Note using Put request!
router.put("/updatenotes/:id", fetchUserDetails, validateFormData, async (req, res) => {
  try {
    const updatedNote = {};
    if (req.body.title) updatedNote.title = req.body.title;
    if (req.body.description) updatedNote.description = req.body.description;
    if (req.body.tag) updatedNote.tag = req.body.tag;

    const validNote = await notesDB.findById(req.params.id);
    if (!validNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (validNote.user.toString() !== req.authData) {
      return res.status(401).json({ message: "Unauthorized access denied!" });
    }

    const updatedNoteDoc = await notesDB.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );
    res.send(updatedNoteDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete Note using DELETE request!
router.delete("/deletenote/:id", fetchUserDetails, async (req, res) => {
  try {
    const validNote = await notesDB.findById(req.params.id);
    if (!validNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (validNote.user.toString() !== req.authData) {
      return res.status(401).json({ message: "Unauthorized access denied!" });
    }

    await notesDB.findByIdAndDelete(req.params.id);
    res.send(validNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;