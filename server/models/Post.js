import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userPicturePath: {
      type: String,
      default: 'default.jpg',
    },
    title: {
      type: String,
      required: true,
      min: 2,
    },
    description: {
      type: String,
      required: true,
    },
    hashtags: Array,
    specs: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true
    },
    location: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    price: Number,
    share: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    saved: {
      type: Map,
      of: Boolean,
    },
    impressions: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);