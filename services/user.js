import User from "../collections/user";
import Message from "../utilities/messages";
import {
  encryptpassword,
  generateToken,
  generateRandom
} from "../utilities/universal";
import { LIMIT } from "../utilities/constants";
// import * as Mail from "../utilities/mail";

/********** Save users **********/
export const save = async payload => {
  if (await User.checkEmail(payload.email))
    throw new Error(Message.emailAlreadyExists);
  const password = payload.password;
  payload.password = encryptpassword(password);
  payload.uid = generateRandom(6, false);
  const userData = await User.saveUser({
    ...payload
  });
  return userData;
};

/********** Login users **********/
export const onLogin = async payload => {
  const userData = await User.findOneByCondition({
    email: payload.email,
    password: encryptpassword(payload.password)
  });
  if (!userData) throw new Error(Message.invalidCredentials);
  if (userData.status === 0) throw new Error(Message.accountDeleted);
  if (userData.status === 2) throw new Error(Message.userBlocked);

  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken);
  return {
    _id: data._id,
    username: data.username,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin
  };
};
/********** Logout users **********/
export const logoutUser = async payload => {
  return await User.logout(payload.userId, payload.token);
};
/********** users list **********/
export const usersList = async payload => {
  const search = payload["search"] ? payload["search"] : "";
  const regex = new RegExp(`${search}`, "i");
  const users = User.findByCondition({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } },
      { email: { $regex: regex } }
    ]
  });
  const skip = payload["pageNumber"]
    ? (Number(payload["pageNumber"]) - 1) * LIMIT.USERS
    : 0;
  return {
    records: await users
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(LIMIT.USERS)
      .select({ __v: 0, updatedAt: 0, loginToken: 0, password: 0 }),
    total: await users.count(),
    limit: LIMIT.USERS
  };
};
/********* Update user info *********/
export const updateUserInfo = async payload => {
  return await User.updateUser(payload);
};
