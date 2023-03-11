import { Schema } from 'mongoose';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
      username:{
        type : String,
        min:4
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      location:{
        city:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        }
      },
      picturePath: {
        type: String,
        default: "public/asset",
      },
      followers:[
        {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
      ],
      following:[
        {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
      ],
      viewedProfile: {
        type: Number
      },
      impressions:{
        type: Number,
        default: 1
      },
      posts:[
        {
            type: Schema.type.ObjectId,
            ref: "Post"
        }
      ],
      saved:[
        {
            type: Schema.type.ObjectId,
            ref: "Post"
        }
      ],
      created:[
        {
            type: Schema.type.ObjectId,
            ref: "Post"
        }
      ],
    },
    { timestamps: true }
  );

export default mongoose.model('User', UserSchema);
