const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);
