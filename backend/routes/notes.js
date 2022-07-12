const express = require("express");
const Notes = require("../models/notesModel");

const router = express.Router();

// GET all notes
router.get("/", (req, res) => {
  res.json({ mssg: `GET all notes` });
});

// GET a note
router.get("/:id", (req, res) => {
  res.json({ mssg: `GET a note` });
});

// POST a new note
router.post("/", async (req, res) => {
  res.json({ mssg: `POST a new note` });
});

// UPDATE a note
router.patch("/:id", (req, res) => {
  res.json({ mssg: `UPDATE a note` });
});

// DELETE a note
router.delete("/:id", (req, res) => {
  res.json({ mssg: `DELETE a note` });
});

module.exports = router;
