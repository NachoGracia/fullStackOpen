import "./app.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [blogs, setBlogs] = useState([]);
  console.log("🚀 ~ App ~ blogs:", blogs);
  const [newBlog, setNewBlog] = useState(false);

  // console.log("🚀 ~ App ~ user:", user);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [important, setImportant] = useState(false);

  useEffect(() => {
    const getPrevUserLogged = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

      if (loggedUserJSON) {
        const userInLocalStorage = JSON.parse(loggedUserJSON);
        // console.log("🚀 userInLocalStorage:", userInLocalStorage);

        try {
          const userList = await userService.user();
          // console.log("🚀 userList:", userList);

          const userLogged = userList.find(
            (user) => user.username === userInLocalStorage.username
          );
          // console.log("🚀 ~ getPrevUserLogged ~ userLogged:", userLogged);

          if (userLogged) {
            setUser(userLogged);
            blogService.setToken(userInLocalStorage.token);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    getPrevUserLogged();
  }, []);

  useEffect(() => {
    fetchBlogs();
    setNewBlog(false);
  }, [newBlog]);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userToLog = await loginService.login({
        username,
        password,
      });
      try {
        const userList = await userService.user();

        const userLogged = userList.find(
          (user) => user.username === userToLog.username
        );
        // console.log("🚀 ~ handleLogin ~ userLogged:", userLogged);
        setUser(userLogged);
        setUsername("");
        setPassword("");
        blogService.setToken(userToLog.token);
        window.localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(userToLog)
        );

        try {
        } catch (error) {
          setErrorMessage("login failed");
        }
      } catch (exception) {
        setErrorMessage("user not found");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
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

  return (
    <>
      <h2>blogs</h2>

      {!user ? (
        loginForm()
      ) : (
        <div className="userContainer">
          <p>{user.username} logged-in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {<button onClick={handleLogOut}>logout</button>}
        </div>
      )}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {user && blogForm()}
    </>
  );
};

export default App;
