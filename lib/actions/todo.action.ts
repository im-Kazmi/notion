"use server";
import Page from "@/models/page.model";
import Todo from "@/models/todo.model";
import connectToDatabase from "@/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createTodoPage({ parentTodoId }: any) {
  try {
    const { userId } = auth();
    await connectToDatabase();

    const newTodoPage = new Todo({
      author: userId,
      parentTodo: parentTodoId,
    });

    const savedTodoPage = await newTodoPage.save();

    if (parentTodoId) {
      const parentTodPage = await Page.findByIdAndUpdate(parentTodoId, {
        $push: { childTodos: savedTodoPage._id },
      });
    }
    revalidatePath("/");
    return savedTodoPage;
  } catch (error) {
    console.log(error);
  }
}
