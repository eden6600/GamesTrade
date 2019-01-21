const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  aboutGame: {
    type: Schema.Types.ObjectId,
    ref: 'games'
  },
  text: {
    type: String,
    required: true
  },
  replies: [
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema);
