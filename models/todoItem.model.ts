import { Schema, model, models } from "mongoose";

export interface ITodoItem extends Document {
  text: string;
  status: string;
}

const todoItemSchema = new Schema(
  {
    todoId: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
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

const TodoItem = models?.TodoItem || model("TodoItem", todoItemSchema);

export default TodoItem;
