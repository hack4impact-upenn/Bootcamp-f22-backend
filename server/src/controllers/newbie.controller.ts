import express from 'express';
import { Newbie } from '../models/newbies';
import StatusCode from '../config/statusCode';
import ApiError from '../config/apiError';
import {
  deleteNewbiewById,
  findNewbiewsByName,
  getAllNewbies,
  updateNewbiew,
} from '../services/newbie.service';

const postNewbie = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { firstName, lastName, graduation, major, hometown } = req.body;
  const duplicate = await findNewbiewsByName(firstName, lastName);
  if (duplicate.length > 0) {
    next(ApiError.badRequest('Newbie Already Exists'));
    return;
  }
  try {
    const newbie = new Newbie();
    newbie.first_name = firstName;
    newbie.last_name = lastName;
    newbie.major = major;
    newbie.graduation = graduation;
    // since the field we add is not required, we would need to check if it has been provided before assigning it
    if (hometown) {
      newbie.hometown = hometown;
    }
    await newbie.save();
    res.status(StatusCode.OK).send({ res: newbie });
  } catch (err) {
    next(ApiError.internal('An unexpected error has occured'));
  }
};

const getAll = async (
  _: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const result = await getAllNewbies();
  if (result != null) {
    res.status(StatusCode.OK).send(result);
  } else {
    next(ApiError.internal('An unexpected error has occured'));
  }
};

const deleteById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const result = await deleteNewbiewById(id);
  if (result != null) {
    res.status(StatusCode.OK).send({ result });
  } else {
    next(ApiError.notFound('No newbie with this id exists'));
  }
};

// Todo add more routes here

const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const updateQuery = req.body;
  const result = await updateNewbiew(id, updateQuery);
  if (result != null) {
    res.status(StatusCode.OK).send({ result });
  } else {
    next(ApiError.notFound('The newbie you are trying to edit does not exist'));
  }
};

export { postNewbie, getAll, deleteById, update };
