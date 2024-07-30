const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const blog = new Blog(body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.delete("/delete/:id", async (request, response) => {
  await Blog.findByIdAndDelete(id).then((blogs) => {
    response.json(blogs);
  });
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
