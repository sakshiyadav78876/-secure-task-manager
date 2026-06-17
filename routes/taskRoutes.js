const express = require("express");
const router = express.Router();
console.log("TASK ROUTES LOADED");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

router.get("/test", async (req, res) => {
  res.json({
    message: "AUTH ROUTES NEW VERSION",
    sakshi: "DEBUG123"
  });
});
// ================= AUTH MIDDLEWARE
const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized / Invalid token" });
  }
};

// ================= GET TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
      .populate("userId", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= ADD TASK
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      userId: req.user.id,
      text: req.body.text,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= EDIT TASK
router.put("/edit/:id", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.text = text;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= TOGGLE DONE
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.done = !task.done;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ================= DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;