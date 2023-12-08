"use server";
import Page from "@/models/page.model";
import Todo from "@/models/todo.model";
import TodoItem from "@/models/todoItem.model";
import connectToDatabase from "@/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createTodo() {
  try {
    const { userId } = auth();
    await connectToDatabase();

    const savedTodo = await Todo.create({
      author: userId,
    });

    const initialTodoItems = [
      {
        todoId: savedTodo._id,
        text: "do Yoga for 15 minutes",
        status: "notStarted",
      },
      { todoId: savedTodo._id, text: "Learn Next.js", status: "inProgress" },
      { todoId: savedTodo._id, text: "Sleep 7 Hours", status: "done" },
    ];
    const todos = await TodoItem.create(initialTodoItems);

    for (let todoItem of todos) {
      const todo = await Todo.findByIdAndUpdate(savedTodo._id, {
        $push: { items: todoItem._id },
      });
    }
    console.log(savedTodo);
    revalidatePath("/");
    return savedTodo;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTodos() {
  try {
    const { userId } = auth();

    await connectToDatabase();

    if (!userId) {
      return;
    }
    const todos = await Todo.find({
      author: userId,
    })
      .populate("items")
      .lean();
    return todos;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo({ id }: { id: string }) {
  try {
    const { userId } = auth();

    await connectToDatabase();

    if (!userId) {
      return;
    }
    await Todo.findByIdAndDelete(id);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
