"use server";

import page from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import Page from "@/models/page.model";
import connectToDatabase from "@/utils/connectDb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function addPage({ path, parentPageId }: any) {
  try {
    const { userId } = auth();

    await connectToDatabase();

    const newPage = new Page({
      author: userId,
      parentPage: parentPageId,
    });

    const savedPage = await newPage.save();

    if (parentPageId) {
      const parentPage = await Page.findByIdAndUpdate(parentPageId, {
        $push: { childPages: savedPage._id },
      });
    }
    revalidatePath(path);
    // return JSON.stringify(savedPage);
    return savedPage;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPages() {
  try {
    const { userId } = auth();

    await connectToDatabase();

    if (!userId) {
      return;
    }
    const pages = await Page.find({
      author: userId,
      parentPage: { $exists: false },
    })
      .populate({
        path: "childPages",
        model: Page,
        populate: {
          path: "childPages",
          populate: {
            path: "childPages",
            populate: {
              path: "childPages",
              populate: {
                path: "childPages",
                populate: {
                  path: "childPages",
                  populate: {
                    path: "childPages",
                    populate: { path: "childPages" },
                  },
                },
              },
            },
          },
        },
      })
      .lean();

    return pages;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePage({ pageId }: { pageId: string }) {
  try {
    const page = await Page.findOne({ _id: pageId });

    return page;
  } catch (error) {
    console.log(error);
  }
}

export async function editPage({
  pageId,
  data,
}: {
  pageId: string;
  data: any;
}) {
  try {
    const page = await Page.findOneAndUpdate({ _id: pageId }, data);

    const updatedPage = await Page.findById(page._id);
    revalidatePath("/");
    return updatedPage;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePage({ id }: { id: string }) {
  try {
    await connectToDatabase();
    const page = await Page.findByIdAndDelete(id);

    revalidatePath("/");
    return page;
  } catch (error) {}
}
export async function duplicatePage(id: string) {
  try {
    await connectToDatabase();
    const page = await Page.findById(id);

    const duplicatePage = await Page.create({
      title: page.title,
      icon: page.icon,
      content: page.content,
      cover: page.cover,
      tags: page.tags,
      author: page.author,
    });

    console.log(duplicatePage);
    revalidatePath("/");
    return duplicatePage;
  } catch (error) {}
}
