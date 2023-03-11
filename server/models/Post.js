import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    specs: String,
    picturePath: String,
    location: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
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