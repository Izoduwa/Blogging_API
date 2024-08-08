const joi = require("joi");

const AddBlogSchema = joi.object({
  title: joi.string().min(5).max(255).trim().required(),
  description: joi.string().min(5).max(500).trim().optional(),
  author: joi.string().min(4).max(50).trim().optional(),
  state: joi
    .string()
    .valid("draft", "published")
    .default("draft")
    .trim()
    .optional(),
  read_count: joi.number().min(0).default(0).optional(),
  reading_time: joi.string().min(0).optional(),
  tag: joi.string().min(3).max(50).trim().optional(),
  body: joi.string().min(10).trim().required(),
  userID: joi.string().trim().optional(),
});

const UpdateBlogSchema = joi.object({
  title: joi.string().min(5).max(255).trim().optional(),
  description: joi.string().min(5).max(500).trim().optional(),
  author: joi.string().min(4).max(50).trim().optional(),
  state: joi.string().valid("draft", "published").trim().optional(),
  read_count: joi.number().min(0).optional(),
  reading_time: joi.number().min(0).optional(),
  tag: joi.string().min(3).max(50).trim().optional(),
  body: joi.string().min(10).trim().optional(),
});

async function AddBlogValidationMW(req, res, next) {
  const blogPayLoad = req.body;
  try {
    await AddBlogSchema.validateAsync(blogPayLoad);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
}

async function UpdateBlogValidationMW(req, res, next) {
  const blogPayLoad = req.body;
  try {
    await UpdateBlogSchema.validateAsync(blogPayLoad);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  AddBlogValidationMW,
  UpdateBlogValidationMW,
};
/*
{
"title": "Another Champion's Triumph for Real Madrid" ,
"description": "Real Madrid come back",
"author": "Kelly",
"state": "draft",
"read_count": 0,
"tag": "Sport",
"body": "Yet again Real Madrid came back from the brink to book another UEFA Champions League final"
}
*/
