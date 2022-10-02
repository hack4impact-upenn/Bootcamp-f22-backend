import { Newbie } from '../models/newbies';

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

export { findNewbiewsByName, getAllNewbies, deleteNewbiewById };
