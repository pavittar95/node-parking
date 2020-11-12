import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    slot: {
      type: Number,
      required: true,
      unique: true
    },
    parkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isParked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 1, //active: 1, inactive: 0
    },
    parkingTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default parkingSlotSchema;
