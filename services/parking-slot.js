import ParkingSlot from "../collections/parking-slot";
import Message from "../utilities/messages";

export const addParkingSlot = async (payload) => {
  if (await ParkingSlot.checkSlot(payload.slot))
    throw new Error(Message.slotAlreadyExists);
  return await ParkingSlot.add({
    ...payload,
  });
};

export const parkingSlotList = async (condition = {}) => {
  const parkingslots = ParkingSlot.findByCondition(condition);
  return await parkingslots.sort({ createdAt: -1 }).select({ __v: 0 });
};

export const updateParkSlot = async (payload) => {
  let check = await ParkingSlot.findByCondition({
    _id: payload.id,
    isParked: true,
  });
  if (check.length) throw new Error(Message.parkAlready);
  return await ParkingSlot.updateParkingSlot(payload);
};

export const updateUnParkSlot = async (payload) => {
  let check = await ParkingSlot.findByCondition({
    _id: payload.id,
    isParked: false,
  });
  if (check.length) throw new Error(Message.unparkAlready);
  const data = await ParkingSlot.updateParkingSlot(payload);
  let timeDiff =
    (new Date(data.parkingTime.getTime()) - new Date().getTime()) / 1000;
  let total = Math.ceil(Math.abs(Math.round(timeDiff / 60)) / 60) * 10;
  return {
    ...data._doc,
    parkingFee: total,
  };
};
