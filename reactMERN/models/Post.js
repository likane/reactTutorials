const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users" // Connects user to each post
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
      type: string
  },
  likes: [
      {
          user: {
              type: Schema.Types.ObjectId,
              ref: 'users' // so we know which likes from which users
          }
      }
  ],
  comments: [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users' // so we know which likes from which users
        }
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
],
date: {
    type: Date,
    default: Date.now
}
});

module.exports = Post = mongoose.model('post', PostSchema);