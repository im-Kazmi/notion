import { Schema, model, Document } from "mongoose";

export interface ITodoItem extends Document {
  text: string;
  status: string;
}

const todoItemSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "notStarted",
      enum: ["notStarted", "inProgress", "done"],
    },
  },
  { timestamps: true }
);

const TodoItem = model<ITodoItem>("TodoItem", todoItemSchema);

export default TodoItem;
