import express from 'express';
import { Newbie } from '../models/newbies';
import StatusCode from '../config/statusCode';
import ApiError from '../config/apiError';
import {
  deleteNewbiewById,
  findNewbiewsByName,
  getAllNewbies,
} from '../services/newbie.service';

const postNewbie = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { firstName, lastName, graduation, major } = req.body;
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

export { postNewbie, getAll, deleteById };
