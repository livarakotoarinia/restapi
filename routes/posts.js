const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    // save to DB
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.patch("/:id", async (req, res) => {
  const post = await Post.updateOne(
    { _id: req.params.id },
    { $set: { title: req.body.title } }
  );
  res.json(post);
});

router.delete("/:id", (req, res) => {
  Post.remove({ _id: req.params.id });
});

module.exports = router;
