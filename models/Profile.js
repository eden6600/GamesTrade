const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = require('./Game');
const TradeRequest = require('./Request');

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
