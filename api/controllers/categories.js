const Category = require('../models/category');

// GET /categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /categories
exports.createCategory = async (req, res) => {
  const { name, backgroundColor, iconUrl } = req.body;
  const category = new Category({ name, backgroundColor, iconUrl });

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
