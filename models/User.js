const { Schema, model } = require('../config/db-connection');

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  organizations: [{
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }]
});

// Defining Indexes
userSchema.index({ username: 1})

// Defining 
// userSchema.methods.sayHello = function () {
//     return `Hello! My name is ${this.name}`
// }

// Defining Static model method
userSchema.statics.getByUsername = async function (input) {
    return await this.findOne({username: input})
}

module.exports = model('User', userSchema);

// each user can manage + create orgs