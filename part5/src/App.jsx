import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [userToCompare, setUserToCompare] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [important, setImportant] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("🚀 ~ useEffect ~ user:", user);

      setUser(user);
      handleLoginOk();
    }
  }, []);

  useEffect(() => {
    if (userLogged) {
      handleLoginOk();
    }
  }, [userLogged, user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userToLog = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userToLog)
      );
      blogService.setToken(userToLog.token);
      setUser(userToLog);
      setUsername("");
      setPassword("");
      setUserLogged(true);
      setUserToCompare(userToLog.username);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLoginOk = async (event) => {
    try {
      const userList = await userService.user();
      const userLogged = userList.find(
        (user) => user.username === userToCompare
      );

      setUser(userLogged);
    } catch (exception) {
      setErrorMessage("login failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleNewBlog = (event) => {
    event.preventDefault();
    const newBlogObject = {
      content: content,
      likes: likes,
      important: important,
    };
    blogService.create(newBlogObject);
    setContent("");
    setLikes(0);
    setImportant(false);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUserLogged(false);
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

      {errorMessage && <div>{errorMessage}</div>}
      {!userLogged ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          {user?.blogs?.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {<button onClick={handleLogOut}>logout</button>}
        </div>
      )}
      {!userLogged ? null : blogForm()}
    </>
  );
};

export default App;
