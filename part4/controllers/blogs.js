const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
  return null;
};

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const token = getTokenFrom(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  console.log("🚀 ~ blogsRouter.post ~ user:", user);

  const blog = new Blog({
    content: body.content,
    likes: body.likes,
    important: body.important === undefined ? false : body.important,
    user: user.id,
    createdBy: user.username,
  });
  const savedBlog = await blog.save();
  console.log("🚀 ~ blogsRouter.post ~ savedBlog:", savedBlog);

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/delete/:id", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: "unauthorized action" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(200).json({ message: "deleted ok" }).end();
});

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.put("/update/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const blog = {
    content: body.content,
    important: body.important || false,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
