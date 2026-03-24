import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICounter {
  _id: string;
  seq: number;
}

type ICounterDocument = ICounter & Document;

const CounterSchema = new Schema<ICounterDocument>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter: Model<ICounterDocument> =
  mongoose.models.Counter || mongoose.model<ICounterDocument>('Counter', CounterSchema);

export default Counter;
