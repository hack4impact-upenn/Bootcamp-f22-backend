import express from 'express';
import { Newbie } from '../models/newbies';

const router = express.Router();

router.post('/', async (req, res) => {
  const { first_name, last_name, graduation, major } = req.body;
  const duplicate = await Newbie.find({ first_name, last_name });
  if (duplicate) {
    console.log('duplicate found');
    res
      .status(400)
      .send({ success: false, message: 'a duplicate newbie exists' });
  }
  try {
    const newbie = new Newbie();
    newbie.first_name = first_name;
    newbie.last_name = last_name;
    newbie.major = major;
    newbie.graduation = graduation;
    await newbie.save();
    res.status(201).send({ success: true, res: newbie });
  } catch (err) {
    console.log('an error has occured');
    console.log(err);
    res.status(400).send({ success: false });
  }
});

router.get('/', async (_, res) => {
  const result = await Newbie.find();
  if (result != null) {
    console.log(result);
    res.status(200).send({ success: true, data: result });
  } else {
    res.status(400).send({ success: false });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Newbie.findByIdAndDelete(id);
  if (result != null) {
    res.status(200).send({ success: true, data: result });
  } else {
    res.status(404).send({ success: false });
  }
});

// TODO: ADD YOUR ROUTES HERE

export default router;
