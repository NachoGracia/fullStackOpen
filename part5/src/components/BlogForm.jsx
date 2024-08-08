import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  setNewBlog,
  setBlogs,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [important, setImportant] = useState(false);

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlogObject = {
      content: content,
      likes: likes,
      important: important,
    };

    try {
      const prevBlogs = await blogService.getAll();
      console.log("🚀 ~ handleNewBlog ~ prevBlogs:", prevBlogs);

      await blogService.create(newBlogObject);
      setNewBlog(true);
      setContent("");
      setLikes(0);
      setImportant(false);

      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      if (updatedBlogs.length > prevBlogs.length) {
        setSuccessMessage("New blog added! ✔");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Error creating new blog:", error);

      setErrorMessage("Error creating new blog ❌");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new Blog</h2>
      <form onSubmit={handleNewBlog}>
        <input
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="number"
          name="likes"
          value={likes}
          onChange={(e) => setLikes(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
          name="important"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
