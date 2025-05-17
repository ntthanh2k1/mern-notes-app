import Note from "../models/note.model.js";

const addNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;

    if (!title) {
      return res.status(400).json({ error: true, message: "title required." });
    }

    if (!content) {
      return res.status(400).json({ error: true, message: "Content required." });
    }

    const note = new Note({
      title: title,
      content: content,
      tags: tags || [],
      userId: user._id
    });

    await note.save();

    res.status(201).json({ error: false, message: "Note created successfully." });
  } catch (error) {
    error.methodName = addNote.name;
    next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const user = req.user;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    if (user._id !== note.userId) {
      return res.status(400).json({ error: true, message: "You are not authorized to perform this action." })
    }

    if (!title) {
      return res.status(400).json({ error: true, message: "title required." });
    }

    if (!content) {
      return res.status(400).json({ error: true, message: "Content required." });
    }

    note.title = title;
    note.content = content;
    note.tags = tags || note.tags;
    await note.save();

    res.status(200).json({ error: false, message: "Note updated successfully." });
  } catch (error) {
    error.methodName = editNote.name;
    next(error);
  }
};

const pinNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    if (user._id !== note.userId) {
      return res.status(400).json({ error: true, message: "You are not authorized to perform this action." })
    }

    note.isPinned = !note.isPinned;
    await note.save();

    const action = note.isPinned ? "pinned" : "unpinned";

    res.status(200).json({ error: false, message: `Note ${action} successfully.` });
  } catch (error) {
    error.methodName = pinNote.name;
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
  } catch (error) {
    error.methodName = deleteNote.name;
    next(error);
  }
}

export { addNote, editNote, pinNote };
