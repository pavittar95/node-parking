import mongoose from "mongoose";
import dbSchema from "./db-schema";

class UserClass {
  static checkEmail(email) {
    return this.findOne({ email });
  }
  static findOneByCondition(condition) {
    return this.findOne(condition);
  }
  static findByCondition(condition) {
    return this.find({ role: { $ne: 2 }, status: { $ne: 0 }, ...condition });
  }
  static checkUsername(username) {
    return this.findOne({ username });
  }
  static checkToken(token) {
    return this.findOne({ "loginToken.token": token });
  }
  static saveUser(payload) {
    return this(payload).save();
  }
  static onLoginDone(userId, loginToken) {
    let updateData = {
      $push: { loginToken: { token: loginToken } },
      $set: {
        lastLogin: new Date()
      }
    };

    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
  static updateUser(payload) {
    let updateData = {
      $set: {
        ...payload
      }
    };

    return this.findByIdAndUpdate(payload.userId, updateData, { new: true });
  }
  static logout(userId, token) {
    let updateData = {
      $pull: { loginToken: { token } }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }
}

dbSchema.loadClass(UserClass);

export default mongoose.model("User", dbSchema);
