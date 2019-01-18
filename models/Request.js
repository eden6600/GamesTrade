const mongoose = require('mongoose');
const Schema = mongoose.Schema;

RequestSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  demand: {
    type: Schema.Types.ObjectId,
    required: true
  },
  offer: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Request = mongoose.model('requests', RequestSchema);
