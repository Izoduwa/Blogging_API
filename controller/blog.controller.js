const asyncHandler = require("express-async-handler");
const blogModel = require("../models/blog");

function readingTime(valueIn) {
  const arrValue = valueIn.split(" ");
  const value = arrValue.length / 120;
  return value.toFixed(0);
}

//http://[::1]:7000/api/blog?page=3

const getAllBlogItems = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = 20; // Number of items per page

  const totalCount = await blogModel.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const blog = await blogModel
    .find(
      { userID: req.user._id.toString() },
      {
        _id: 1,
        title: 1,
        state: 1,
        read_count: 1,
      }
    )
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.json({
    blog,
    page,
    totalPages,
    totalCount,
  });
});

const getAllBlogItemsByStatus = asyncHandler(async (req, res) => {
  const stateparams = req.params.state;
  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = 20; // Number of items per page

  const totalCount = await blogModel.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const blog = await blogModel
    .find(
      { state: stateparams, userID: req.user._id.toString() },
      {
        _id: 1,
        title: 1,
        state: 1,
        read_count: 1,
      }
    )
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.json({
    blog,
    page,
    totalPages,
    totalCount,
  });
});

const getPublishedBlogItems = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = 20; // Number of items per page

  const totalCount = await blogModel.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const blog = await blogModel
    .find(
      { state: "published" },
      {
        _id: 1,
        title: 1,
        author: 1,
        tag: 1,
        read_count: 1,
      }
    )
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.json({
    blog,
    page,
    totalPages,
    totalCount,
  });
});

// Kelly%20Izoduwa
//http://[::1]:7000/api/blog/published/items/tag/Movies
//http://[::1]:7000/api/blog/published/items/author/kelly izoduwa
//http://[::1]:7000/api/blog/published/items/title/Moving train

const getPublishedBlogItemsSearch = asyncHandler(async (req, res) => {
  const searchparams = req.params.search_item;
  const search = new RegExp(searchparams, "i");
  const field = req.params.fieldname.toLowerCase();

  const query = {
    [field]: search,
    state: "published",
  };

  const page = parseInt(req.query.page) || 1; // Current page number
  const pageSize = 20; // Number of items per page

  const totalCount = await blogModel.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  let blog;

  try {
    blog = await blogModel
      .find(query, {
        _id: 1,
        title: 1,
        author: 1,
        tag: 1,
        read_count: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  } catch (error) {
    res.status(404);
    throw new Error("Blog item(s) not found");
  }

  res.json({
    blog,
    page,
    totalPages,
    totalCount,
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await blogModel.findById(id);

  const user_id = req.user._id.toString();
  if (user_id === blog.userID) {
    res.status(200).send(blog);
  } else {
    res.status(404);
    throw new Error("Blog item not found");
  }
});

const getPublishedBlogById = (req, res) => {
  res.json(req.data);
};

const addBlogItem = asyncHandler(async (req, res) => {
  const blog = req.body;
  blog.reading_time = readingTime(blog.body) + " min read";

  blog.userID = req.user._id.toString();

  const name = req.user.first_name + " " + req.user.last_name;

  blog.author = name;

  const newBlog = await blogModel.create(blog);
  res.status(201).send(newBlog);
});

const updateBlogItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const dbBlog = await blogModel.findById(id);

  var blog = req.body;

  blog.reading_time = readingTime(blog.body) + " min read";

  const user_id = req.user._id.toString();
  if (user_id === dbBlog.userID) {
    const newBlog = await blogModel.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).send(newBlog);
  } else {
    res.status(404);
    throw new Error("Blog item not found");
  }
});

const deleteBlogItemById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await blogModel.findById(id);

  const user_id = req.user._id.toString();
  if (user_id === blog.userID) {
    const newBlog = await blogModel.findByIdAndDelete(id);
    res.status(200).send(newBlog);
  } else {
    res.status(404);
    throw new Error("Blog item not found");
  }
});

module.exports = {
  getAllBlogItems,
  getAllBlogItemsByStatus,
  getPublishedBlogItems,
  getPublishedBlogItemsSearch,
  getBlogById,
  getPublishedBlogById,
  addBlogItem,
  updateBlogItem,
  deleteBlogItemById,
};
