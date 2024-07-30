// Utiliza la lirería SuperTest para escribir una prueba que realice una solicitud HTTP GET
// a la URL /api/blogs. Verifica que la aplicación de la lista de blogs devuelva la cantidad
// correcta de publicaciones de blog en formato JSON.b

const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const app = require("../app");
const Blog = require("../models/blogs");

const api = supertest(app);

const initialBlogs = [
  {
    content: "Blog 1",
    important: true,
    likes: 1,
  },
  {
    content: "Blog 2",
    important: false,
    likes: 1,
  },
  {
    content: "Blog 3",
    important: true,
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("http get conexion ok", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
  const response = await api.get("/api/blogs");

  //console.log(response.body);

  assert.strictEqual(response.body.length, 3);
});

test("id property is defined", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    //console.log(blog.id);
    assert(blog.id);
  });
});

test("increase by 1 blog entry", async () => {
  const blog = {
    content: "increased by 1",
    important: true,
    likes: 3,
  };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  const blogContents = blogs.map((blog) => blog.content);

  assert.strictEqual(response.body.content, blog.content);
  assert.strictEqual(blogs.length, initialBlogs.length + 1);
  assert(blogContents.includes(blog.content));
});

test("delete blog", async () => {
  const blogsInDb = await api.get("/api/blogs");
  //console.log("lo de la db", blogsInDb.body);

  const id = blogsInDb.body[0].id;
  console.log("ID:", id);
  await api.delete(`/api/blogs/delete/${id}`).expect(200);
});

test("update blog's likes", async () => {
  const blogsInDb = await api.get("/api/blogs");
  const id = blogsInDb.body[0].id;

  const blog = {
    content: "increased by 1",
    important: true,
    likes: 3,
  };

  await api.put(`/api/blogs/update/${id}`).send(blog).expect(200);
});

after(async () => {
  await mongoose.connection.close();
});
