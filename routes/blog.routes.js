const express = require("express");
const protect = require("../auth/auth");

const {
  getAllBlogItems,
  getAllBlogItemsByStatus,
  getPublishedBlogItems,
  getPublishedBlogItemsSearch,
  getBlogById,
  getPublishedBlogById,
  addBlogItem,
  updateBlogItem,
  deleteBlogItemById,
} = require("../controller/blog.controller");
const {
  AddBlogValidationMW,
  UpdateBlogValidationMW,
} = require("../validators/blog.validator");

const blogRouter = express.Router();

blogRouter.get("/", protect, getAllBlogItems);
blogRouter.get("/:id", protect, getBlogById);
blogRouter.get("/state/:state", protect, getAllBlogItemsByStatus);
blogRouter.get("/published/items", getPublishedBlogItems);
blogRouter.get(
  "/published/items/:fieldname/:search_item",
  getPublishedBlogItemsSearch
);
blogRouter.get("/published/item/:id", getPublishedBlogById);
blogRouter.post("/", protect, AddBlogValidationMW, addBlogItem);
blogRouter.put("/:id", protect, UpdateBlogValidationMW, updateBlogItem);
blogRouter.delete("/:id", protect, deleteBlogItemById);

module.exports = blogRouter;
