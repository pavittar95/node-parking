import { successAction, failAction } from "../utilities/response";
import {
  addParkingSlot,
  parkingSlotList,
  updateUnParkSlot,
  updateParkSlot,
} from "../services/parking-slot";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

export const add = async (req, res, next) => {
  const payload = req.body;
  if (req.user.role !== ROLE.ADMIN) {
    return res.status(400).json(failAction(Message.unauthorizedUser));
  }
  try {
    const data = await addParkingSlot(payload);
    res.status(200).json(successAction(data, Message.registerSuccess));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const list = async (req, res, next) => {
  const payload = {};
  if (req.user.role !== ROLE.ADMIN) {
    payload.isParked = false;
  }
  try {
    const data = await parkingSlotList(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const parkSlot = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await updateParkSlot({
      ...payload,
      parkedBy: req.user.userId,
      isParked: true,
      parkingTime: Date.now(),
    });
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

export const unparkSlot = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await updateUnParkSlot({
      ...payload,
      parkedBy: null,
      isParked: false,
    });
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
