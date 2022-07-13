const express = require("express");
const notes = require("../controllers/notesController");
const router = express.Router();

// GET all notes
router.get("/", notes.getNotes);

// GET a note
router.get("/:id", notes.getNote);

// POST a new note
router.post("/", notes.createNote);

// UPDATE a note
router.patch("/:id", notes.updateNote);

// DELETE a note
router.delete("/:id", notes.deleteNote);

module.exports = router;
