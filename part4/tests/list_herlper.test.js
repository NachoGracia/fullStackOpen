const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper.js.js");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });

  test.only("totalLikes", () => {
    const blogs = [
      {
        title: "title1",
        likes: 3,
      },
      { title: "title2", likes: 5 },
      {
        title: "title3",
        likes: 3,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 11);
  });

  test.only("favoriteBlog", () => {
    const blogs = [
      {
        title: "title1",
        likes: 6,
      },
      { title: "title2", likes: 8 },
      {
        title: "title3",
        likes: 7,
      },
    ];
    const result = listHelper.fovoriteBlog(blogs);
    assert.deepStrictEqual(result, { title: "title2", likes: 8 });
  });
});
