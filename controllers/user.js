import { successAction, failAction } from "../utilities/response";
import {
  save,
  onLogin,
  logoutUser,
  usersList,
  updateUserInfo,
} from "../services/user";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add User ***********/
export const addUser = async (req, res, next) => {
  const payload = req.body;
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  try {
    await save(payload);
    res.status(200).json(successAction(null, Message.userAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Login user ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Lis of user ***********/
export const list = async (req, res, next) => {
  const payload = req.query;
  try {
    const data = await usersList(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Logout user ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** update user info ***********/
export const updateUser = async (req, res, next) => {
  const payload = req.body;
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  try {
    const data = await updateUserInfo(payload);
    res.status(200).json(successAction(data, Message.userUpdate));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** update status of user ***********/
export const status = async (req, res, next) => {
  const payload = req.body;
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  try {
    await updateUserInfo(payload);
    let status = "deleted";
    if (payload.status === 1) {
      status = "activated";
    } else if (payload.status === 2) {
      status = "blocked";
    }
    res.status(200).json(successAction(payload, Message.updateStatus(status)));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
