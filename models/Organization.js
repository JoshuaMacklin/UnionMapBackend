const { Schema, model } = require('../config/db-connection');

const orgSchema = Schema({
  managerId: {
    type: String,
    required: true,
  },
  name: {
      type: String,
      required: true,
  },
  address: {
      type: String,
      required: true
  }
});

module.exports = model('Org', orgSchema);
