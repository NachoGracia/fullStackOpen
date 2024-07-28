const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

module.exports = blogsRouter;
