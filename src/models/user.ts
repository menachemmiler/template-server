import { Schema, Types, Document, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default model<IUser>("User", userSchema);
