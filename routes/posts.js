const router = require("express").Router();
let Posts = require("../models/posts.model");
const express = require("express");

router.route("/").get((req, res) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/author/:name").get((req, res) => {
  let name = req.param("name");
  Posts.find({ author: name })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;

  if (!title || !body)
    return res.status(400).json({ msg: "Not all fields have been entered." });

  const newPosts = new Posts({
    title,
    body,
    author,
  });

  newPosts
    .save()
    .then(() => res.json("Posts added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Posts.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.json("Post deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Posts.findById(req.params.id)
    .then((posts) => {
      posts.title = req.body.title;
      posts.body = req.body.body;

      if (!posts.title || !posts.body)
        return res
          .status(400)
          .json({ msg: "Not all fields have been entered." });

      posts
        .save()
        .then(() => res.json("Posts updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
