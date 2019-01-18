const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },
  igdb_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  trade_for: [
    {
      igdb_id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      platform: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  ],
  gamesLike: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Game = mongoose.model('games', GameSchema);
