const express = require("express");
const { body } = require("express-validator");

const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// All notes routes require login
router.use(fetchuser);

// GET /api/notes/fetchallnotes  (optional ?search=term)
router.get(
  "/fetchallnotes",
  asyncHandler(async (req, res) => {
    const filter = { user: req.user.id };
    if (req.query.search) {
      const term = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rx = new RegExp(term, "i");
      filter.$or = [{ title: rx }, { description: rx }, { tag: rx }];
    }
    const notes = await Note.find(filter).sort({ date: -1 });
    res.json({ success: true, notes });
  })
);

// POST /api/notes/addnote
router.post(
  "/addnote",
  [
    body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("description").trim().isLength({ min: 5 }).withMessage("Description must be at least 5 characters"),
    body("tag").optional().trim(),
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;
    const note = await Note.create({ title, description, tag: tag || "General", user: req.user.id });
    res.status(201).json({ success: true, note });
  })
);

// PUT /api/notes/updatenote/:id
router.put(
  "/updatenote/:id",
  [
    body("title").optional().trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("description").optional().trim().isLength({ min: 5 }).withMessage("Description must be at least 5 characters"),
    body("tag").optional().trim(),
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { title, description, tag } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (tag !== undefined) updates.tag = tag;

    // Filtering by user in the query means one user can never touch another's note
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updates },
      { new: true }
    );
    if (!note) return res.status(404).json({ success: false, error: "Note not found" });
    res.json({ success: true, note });
  })
);

// DELETE /api/notes/deletenote/:id
router.delete(
  "/deletenote/:id",
  asyncHandler(async (req, res) => {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ success: false, error: "Note not found" });
    res.json({ success: true, message: "Note deleted", note });
  })
);

module.exports = router;
