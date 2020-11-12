import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: null
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    loginToken: [
      {
        token: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: new Date()
        }
      }
    ],
    status: {
      type: Number,
      default: 1 // 0 account deleted, 1 active, 2 block
    },
    lastLogin: {
      type: Date,
      default: null
    },
    role: {
      type: Number,
      default: 1 // 1=>USER, 2=>ADMIN
    }
  },
  { timestamps: true }
);

export default userSchema;
