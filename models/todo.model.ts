import { Schema, model, models } from "mongoose";

export interface ITodo extends Document {
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
      default: "my-todos",
    },
    icon: {
      type: String,
      default: "/icons/todo.png",
    },
    cover: {
      type: String,
    },
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
