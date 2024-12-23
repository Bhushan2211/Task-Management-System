const express = require("express");
const router = express.Router();
const Task = require("../models/task");


//fetch all tasks
router.get("/", async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


//create a new task
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json(task);
});


//update task status and send email
router.patch("/:id", async(req, res) => {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if(!task) return res.status(404).send("Task not found");
    task.status = status;
    await task.save();



    res.json(task);
});

module.exports = router;