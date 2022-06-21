import mongoose, { Document } from "mongoose";
import { IGroup } from "./groups.interface";

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  member_requests: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  managers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      role: {
        type: String,
        enum: ["admin", "mod"],
        default: "admin",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
export default mongoose.model<IGroup & Document>("group", GroupSchema);
