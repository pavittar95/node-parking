import mongoose from "mongoose";
import dbSchema from "./db-schema";

class ParkingSlotClass {
  static add(payload) {
    return this(payload).save();
  }
  static checkSlot(slot) {
    return this.findOne({ slot });
  }
  static findOneByCondition(condition = {}) {
    return this.findOne(condition);
  }
  static findByCondition(condition = {}) {
    return this.find({ ...condition });
  }
  static updateParkingSlot(payload) {
    let updateData = {
      $set: {
        ...payload,
      },
    };
    return this.findByIdAndUpdate(payload.id, updateData, { new: true });
  }
}

dbSchema.loadClass(ParkingSlotClass);

export default mongoose.model("parkingslots", dbSchema);
