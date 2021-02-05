const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rowSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Row', rowSchema);
