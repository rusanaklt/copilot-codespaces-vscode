// Cretare web serever
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Setup connection to MongoDB
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/itc230");

// Setup connection to Mongoose
const Comment = require("./models/comment.js");

// Setup app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Setup routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all comments
app.get("/api/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.status(500).send("Error occurred: database error.");
    }
    res.send(comments);
  });
});

// Get a comment by id
app.get("/api/comments/:id", (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).send("Error occurred: database error.");
    }
    if (!comment) {
      return res.status(404).send("Error occurred: comment not found.");
    }
    res.send(comment);
  });
});

// Get comments by author
app.get("/api/comments/author/:author", (req, res) => {
  Comment.find({ author: req.params.author }, (err, comments) => {
    if (err) {
      return res.status(500).send("Error occurred: database error.");
    }
    if (!comments) {
      return res.status(404).send("Error occurred: comments not found.");
    }
    res.send(comments);
  });
});

// Get comments by date
app.get("/api/comments/date/:date", (req, res) => {
  Comment.find({ date: req.params.date }, (err, comments) => {
    if (err) {
      return res.status(500).send("Error occurred: database error.");
    }
    if (!comments) {
      return res.status(404).send("Error occurred: comments not found.");
    }
    res.send(comments);
  });
});

// Create a new comment
app.post("/api/comments", (req, res) => {
  let newComment = new Comment(req.body);