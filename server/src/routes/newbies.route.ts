import express from 'express';
import {
  deleteById,
  getAll,
  postNewbie,
  update,
} from '../controllers/newbie.controller';

const router = express.Router();

router.post('/', postNewbie);

router.get('/', getAll);

router.delete('/:id', deleteById);

router.put('/:id', update);

// TODO: ADD YOUR ROUTES HERE

export default router;
