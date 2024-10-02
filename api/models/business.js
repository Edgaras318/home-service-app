const mongoose = require('mongoose');
const Joi = require('joi');

// Business Schema
const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photos: [String],
  },
  {
    timestamps: true,
  },
);

// Joi Validation Schema
const validateBusiness = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().allow(''),
    address: Joi.string().allow(''),
    category: Joi.string().hex().length(24).required(),
    contactPerson: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    photos: Joi.array().items(Joi.string().uri()),
  });
  return schema.validate(data);
};

// Mongoose Pre-save Hook to Validate Data
businessSchema.pre('save', function (next) {
  // Extract only necessary fields for validation
  const { name, description, address, category, contactPerson, email, photos } = this;

  const { err } = validateBusiness({
    name,
    description,
    address,
    // Convert category ObjectId to string for validation
    category: category.toString(),
    contactPerson,
    email,
    photos,
  });
  if (err) {
    console.log(err); // eslint-disable-line no-console
    next(new Error(err.details[0].message));
  } else {
    next();
  }
});

module.exports = mongoose.model('Business', businessSchema);
