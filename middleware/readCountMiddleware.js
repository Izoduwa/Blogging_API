const blogModel = require("../models/blog");

const readCountMiddleware = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const id = req.params.id;
      // Find the data in MongoDB by ID
      const data = await blogModel.findById(id);
      if (!data) {
        return res.status(404).json({ error: "Data not found" });
      }
      // Check if status is 'published'
      if (data.state !== "published") {
        return res.status(403).json({ error: "Blog is yet to be published" });
      }
      // Increment readCount
      data.read_count++;
      // Save the updated document
      await data.save();
      req.data = data; // Pass the updated data to the next middleware
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    next();
  }
};

module.exports = readCountMiddleware;
