const Notes = require("../models/notesModel");
const mongoose = require("mongoose");

module.exports = {
  // get all notes
  getNotes: async (req, res) => {
    try {
      const user_id = req.user._id;
      const notes = await Notes.find({ user_id }).sort({ createdAt: -1 });
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // get a note
  getNote: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
      }
      const notes = await Notes.findById({ _id: id });
      if (!notes) {
        return res.status(404).json({ error: "Notes not found" });
      }
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // post a note
  createNote: async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "please fill all fields" });
    }

    // store note to database
    try {
      const user_id = req.user._id;
      const notes = await Notes.create({ title, body, user_id });
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // update a note
  updateNote: async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "please fill all fields" });
    }

    // store note to database
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
      }
      const notes = await Notes.findOneAndUpdate(
        { _id: id },
        {
          title,
          body,
        }
      );
      if (!notes) {
        return res.status(404).json({ error: "Notes not found" });
      }
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // delete a note
  deleteNote: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
      }
      const notes = await Notes.findOneAndDelete({ _id: id });
      if (!notes) {
        return res.status(404).json({ error: "Notes not found" });
      }
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
