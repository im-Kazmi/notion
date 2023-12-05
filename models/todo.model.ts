import { Schema, model, models } from "mongoose";

export interface ITdod extends Document {
  title: string;
  icon: string;
  cover?: string;
  parentTodo?: Schema.Types.ObjectId;
  childTodos: Schema.Types.ObjectId[];
  author?: string;
  tags?: string[];
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "untitled",
    },
    icon: {
      type: String,
      default: "/icons/todo.png",
    },
    cover: {
      type: String,
    },
    parentTodo: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
    childTodos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    author: String,
    tags: [
      {
        type: String,
      },
    ],
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "TodoItem",
      },
    ],
  },
  { timestamps: true }
);

const Todo = models?.Todo || model("Todo", todoSchema);

export default Todo;
