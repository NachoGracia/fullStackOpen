import React from "react";

const BlogForm = ({
  handleNewBlog,
  content,
  likes,
  important,
  handleContent,
  handleLikes,
  handleImportant,
}) => {
  return (
    <div>
      <h2>create new Blog</h2>
      <form onSubmit={handleNewBlog}>
        <input
          name="content"
          type="text"
          value={content}
          onChange={handleContent}
        />
        <input
          type="number"
          name="likes"
          value={likes}
          onChange={handleLikes}
        />
        <input
          type="checkbox"
          checked={important}
          onChange={handleImportant}
          name="important"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
