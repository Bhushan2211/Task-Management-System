const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();
const taskRouter = require("./src/routes/taskRoutes");


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Use the router
app.use("/tasks", taskRouter);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'index.html'));
  });


//connect database
mongoose.connect(process.env.URI, 
)
.then(() => console.log("Database Connected"))
.catch((err) => console.error("Error connecting to the database:", err));



//server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
