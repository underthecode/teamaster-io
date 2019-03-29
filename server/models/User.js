const mongoose = require('mongoose');

// desctructured property from mongoose obj
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
