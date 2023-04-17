const Post = require("../model/Post");

const showAllPosts = async (req, res) => {
  const employees = await Post.find();
  if (!employees) return res.status(204).json({ message: "No posts found." });
  res.json(employees);
};

const createNewPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.content || !req?.body?.category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required." });

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}.` });
  }
  const result = await post.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const updatePost = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}.` });
  }
  //
  if (req.body?.title) post.title = req.body.title;
  if (req.body?.content) post.content = req.body.content;
  if (req.body?.category) post.category = req.body.category;
  const result = await post.save();
  res.json(result);
};
const getPost = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Post ID required.' });

    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params.id}.` });
    }
    res.json(post);
};

module.exports = {
  showAllPosts,
  createNewPost,
  deletePost,
  updatePost,
  getPost,
};
