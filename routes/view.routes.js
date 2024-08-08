const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
const User = require("../models/user");
const blogModel = require("../models/blog");

const viewRoutes = express.Router();

function readingTime(valueIn) {
  const value = valueIn.length / 120;
  return value.toFixed(0);
}

viewRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const blogs = await blogModel.find({ state: "published" });

    res.render("index", {
      blogs,
    });
  })
);

viewRoutes.get("/login", (req, res) => {
  res.render("user/login");
});
viewRoutes.get("/register", (req, res) => {
  res.render("user/register");
});
viewRoutes.get("/documentation", (req, res) => {
  res.render("documentation");
});
viewRoutes.get("/error", (req, res) => {
  res.render("error");
});
viewRoutes.get("/edit/blog", (req, res) => {
  res.render("blog/blog");
});

viewRoutes.post("/create/auth", (req, res) => {
  const { author, email } = req.body;
  res.render("blog/create", { author, email });
});

viewRoutes.get("/analyze", (req, res) => {
  blogModel
    .aggregate([
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 },
        },
      },
    ])
    .then((results) => {
      res.render("analyze", { results });
    })
    .catch((error) => {
      res.status(400);
      res.render("error", { message: error });
    });
});

viewRoutes.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { title, description, tag, body, email } = req.body;
    var blog_ = {};
    blog_.title = title;
    blog_.description = description;
    blog_.tag = tag;
    blog_.body = body;
    blog_.reading_time = readingTime(blog_.body) + " min read";

    const user = await User.findOne({ email });

    blog_.userID = user._id.toString();

    const name = user.first_name + " " + user.last_name;

    blog_.author = name;

    const blog = await blogModel.create(blog_);

    res.status(200).render("blog/blog", {
      email: user.email,
      title: blog.title,
      id: blog._id,
      description: blog.description,
      author: blog.author,
      state: blog.state,
      read_count: blog.read_count,
      reading_time: blog.reading_time,
      tag: blog.tag,
      body: blog.body,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    });
  })
);

viewRoutes.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      res.render("error", { message: "User already exists" });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
    });

    const blogs = await blogModel.find({ userID: user._id.toString() });

    if (user) {
      generateToken(res, user._id);
      res.render("blog/home", {
        first_name: user.first_name,
        last_name: user.last_name,
        email,
        blogs,
      });
    } else {
      res.status(400);
      res.render("error", { message: "Invalid user data" });
    }
  })
);

viewRoutes.post(
  "/home/auth",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      const blogs = await blogModel.find({ userID: user._id.toString() });
      const author = user.first_name + " " + user.last_name;
      res.render("blog/home", {
        author,
        email,
        blogs,
      });
    } else {
      res.status(401);
      res.render("error", { message: "Invalid email or password" });
    }
  })
);

viewRoutes.post(
  "/home",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const blogs = await blogModel.find({ userID: user._id.toString() });
      const author = user.first_name + " " + user.last_name;
      res.render("blog/home", {
        author,
        email,
        blogs,
      });
    } else {
      res.status(401);
      res.render("error", { message: "User does not exist!" });
    }
  })
);

viewRoutes.post(
  "/blog",
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const blog = await blogModel.findById(_id);
    blog.read_count++;
    await blog.save();
    res.status(200).render("blog", {
      title: blog.title,
      description: blog.description,
      author: blog.author,
      state: blog.state,
      read_count: blog.read_count,
      reading_time: blog.reading_time,
      tag: blog.tag,
      body: blog.body,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    });
  })
);

viewRoutes.post(
  "/blog/auth",
  asyncHandler(async (req, res) => {
    const { email, id } = req.body;

    const user = await User.findOne({ email });

    const blog = await blogModel.findById(id);

    if (user._id.toString() == blog.userID) {
      res.status(200).render("blog/blog", {
        email: email,
        id: blog._id,
        title: blog.title,
        description: blog.description,
        author: blog.author,
        state: blog.state,
        read_count: blog.read_count,
        reading_time: blog.reading_time,
        tag: blog.tag,
        body: blog.body,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      });
    } else {
      res.status(404);
      res.render("error", { message: "Blog item not found" });
    }
  })
);

viewRoutes.post(
  "/update",
  asyncHandler(async (req, res) => {
    const { id, email } = req.body;

    const user = await User.findOne({ email });

    const blog = await blogModel.findById(id);

    if (user._id.toString() == blog.userID) {
      res.status(200).render("blog/update", {
        email: email,
        id: blog._id,
        author: blog.author,
        title: blog.title,
        description: blog.description,
        state: blog.state,
        tag: blog.tag,
        body: blog.body,
      });
    } else {
      res.status(404);
      res.render("error", { message: "Blog item not found" });
    }
  })
);

viewRoutes.post(
  "/update/auth",
  asyncHandler(async (req, res) => {
    const { id, title, description, tag, body, state, email } = req.body;
    var blog_ = {};
    blog_.title = title;
    blog_.description = description;
    blog_.tag = tag;
    blog_.body = body;
    blog_.state = state;

    const user = await User.findOne({ email });

    blog_.userID = user._id.toString();

    const name = user.first_name + " " + user.last_name;

    blog_.author = name;
    const blog__ = await blogModel.findById(id);

    if (user._id.toString() == blog__.userID) {
      const blog = await blogModel.findByIdAndUpdate(id, blog_, { new: true });
      res.status(200).render("blog/blog", {
        email: user.email,
        id: blog._id,
        title: blog.title,
        description: blog.description,
        author: blog.author,
        state: blog.state,
        read_count: blog.read_count,
        reading_time: blog.reading_time,
        tag: blog.tag,
        body: blog.body,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      });
    } else {
      res.status(404);
      res.render("error", { message: "Blog item not found" });
    }
  })
);

viewRoutes.post(
  "/delete/auth",
  asyncHandler(async (req, res) => {
    const { email, id } = req.body;

    const user = await User.findOne({ email });

    const blog = await blogModel.findById(id);

    if (user._id.toString() == blog.userID) {
      res.status(200).render("blog/delete", {
        email: email,
        id: blog._id,
        title: blog.title,
        description: blog.description,
        author: blog.author,
        state: blog.state,
        read_count: blog.read_count,
        reading_time: blog.reading_time,
        tag: blog.tag,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      });
    } else {
      res.status(404);
      res.render("error", { message: "Blog item not found" });
    }
  })
);

viewRoutes.post(
  "/delete",
  asyncHandler(async (req, res) => {
    const { id, email } = req.body;

    const blog = await blogModel.findById(id);
    const user = await User.findOne({ email });

    if (user._id.toString() == blog.userID) {
      await blogModel.findByIdAndDelete(id);
      const blogs = await blogModel.find({ userID: user._id.toString() });
      res.status(200).render("blog/home", {
        author: blog.author,
        email,
        blogs,
      });
    } else {
      res.status(404);
      res.render("error", { message: "Blog item not found" });
    }
  })
);

module.exports = viewRoutes;
