import mongoose from 'mongoose';
import { Newbie, INewbie } from '../models/newbies';

const findNewbiewsByName = async (firstName: string, lastName: string) => {
  const result = await Newbie.find({
    first_name: firstName,
    last_name: lastName,
  });

  return result;
};

const getAllNewbies = async () => {
  const result = await Newbie.find();
  return result;
};

const deleteNewbiewById = async (id: string) => {
  const result = await Newbie.findByIdAndDelete(id);
  return result;
};

// TODO: add more DB operations here

const updateNewbiew = async (
  id: string,
  update: mongoose.UpdateQuery<INewbie>, // You are not expected to figure out this type, so it is ok to leave it as any. Notice that the type is not Newbiew since we
  // don't necessarily want to update all fields, but could only want to update a subset of the fields, eg: just want to update the major
) => {
  try {
    const result = await Newbie.findByIdAndUpdate(id, update, {
      returnDocument: 'after', // by default, mongo would return the original document after you update. However, if you want to see the updated document,
      // which makes more sense, you can add the option returnDocument: "after"
    });
    return result;
  } catch (err) {
    return null; // if we are not successful
  }
};

export { findNewbiewsByName, getAllNewbies, deleteNewbiewById, updateNewbiew };
