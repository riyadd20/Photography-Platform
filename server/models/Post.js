import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        min:2
    },
    desc:{
        type: String,
        required: true,
    },
    hashtags: [
        {
            type: String
        }
    ],
    specs:{
        type: String
    },
    location:{
        city:{
            type: String,
        },
        country:{
            type: String,
        }
    },
    share: {
        type: String
    },
    likes:{
        type: Map,
        of:Boolean
    },
    saved:{
        type: Map,
        of: Boolean
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
