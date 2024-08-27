require("dotenv").config();
const express = require("express");

const Article = require("./models/blog");
const app = express();
app.use(express.json());
app.use(express.json());

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let uri =
  "mongodb+srv://ajibolafareedah02:u18cps1005@faa1.zgiis6p.mongodb.net/blog?retryWrites=true&w=majority&appName=faa1";

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(uri),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

app.get("/", (req, res) => {
  res.send("Welcome my Personal Blogging API!");
});

// Create a new blog
app.post("/blogs", async (req, res) => {
  try {
    console.log(req.body);
    const result = await Article.create(req.body);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blogs
// app.get("/blogs", async (req, res) => {
//   res.send("Received all blogs");
// });

// Get all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blog = await Article.find();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific blog by ID
app.get("/blogs/:id", async (req, res) => {
  // res.send("Got a Article by ID");
  try {
    const id = req.params.id;
    const blog = await Article.findById(id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog by ID
app.put("/blogs/:id", async (req, res) => {
  res.send("Updated blog by ID");
});

// Update a blog by ID
app.patch("/blogs/:id", async (req, res) => {
  try {
    const result = await Article.findByIdAndUpdate(req.params.id, req.body, {
      // new: true,
    });
    console.log(result);

    if (!result) {
      console.log(result);
      return res.status(404).json({ error: "Article not found" });
    }
    return res.status(201).json(result);

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog by ID
// app.delete("/blogs/:id", (req, res) => {
//   res.send("Deleted blog");
// });

// Delete a blog by ID
app.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Article.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "This Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3045;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
