import mongoose from 'mongoose';

const { Schema } = mongoose;

interface INewbie extends mongoose.Document {
  _id: string;
  first_name: string;
  last_name: string;
  major: string;
  graduation: number;
}

const NewbiewSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  major: { type: String, required: true },
  graduation: { type: Number, required: true },
});

const Newbie = mongoose.model<INewbie>('Newbie', NewbiewSchema);

export { Newbie, INewbie };
