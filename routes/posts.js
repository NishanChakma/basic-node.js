const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); //api methods

//submit a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save(); //save post data into database
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); //find is use to get all data
    res.json(posts); //give response
  } catch (err) {
    res.json({ message: err });
  }
});

//get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); //findById is use to get specific user id
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.postId }); //deleteOne is use to delete data
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      //update using id
      { _id: req.params.postId },
      {
        $set: {
          //set is for update post data and save to database
          title: req.body.title,
          description: req.body.description
        }
      }
    );
    res.json("Your data has been updated");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
