const mongoose = require('mongoose');
const Joi = require('joi');

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    iconUrl: {
      type: String,
      default: 'http://example.com/default-icon.png',
    },
  },
  {
    timestamps: true,
  },
);

// Joi Validation Schema
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    backgroundColor: Joi.string()
      .regex(/^#[0-9A-F]{6}$/i)
      .optional(),
    iconUrl: Joi.string().uri().optional(),
  });
  return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
categorySchema.pre('save', function (next) {
  // Only extract the necessary fields for validation
  const { name, backgroundColor, iconUrl } = this;

  const { error } = validateCategory({ name, backgroundColor, iconUrl });
  if (error) {
    next(new Error(error.details[0].message));
  } else {
    next();
  }
});
module.exports = mongoose.model('Category', categorySchema);
