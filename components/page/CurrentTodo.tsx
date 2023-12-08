"use client";
import { usePageContext } from "@/context/pageContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { editPage } from "@/lib/actions/page.action";
import EmojiPicker from "emoji-picker-react";
import Todos from "../shared/Todos";

const CurrentTodo = () => {
  const { currentTodo, setCurrentTodo }: any = usePageContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [content, setContent] = useState(() => currentTodo?.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setContent(currentTodo?.content);
  }, [currentTodo]);

  const handleEmojiClick = async (emoji: any) => {
    setIsEmojiPickerOpen(false);
    try {
      const page = await editPage({
        pageId: currentTodo._id,
        data: {
          icon: emoji.imageUrl,
        },
      });
      setCurrentTodo(page);
    } catch (error) {}
  };

  return (
    <div className=" w-full min-h-screen justify-center flex ">
      {currentTodo && (
        <div className=" w-full px-20">
          <div className=" min-w-full my-2 flex  cursor-pointer bg-neutral-50 hover:bg-neutral-200">
            {currentTodo.cover ? (
              <Image
                src={currentTodo.cover}
                width={100}
                height={100}
                className=" w-full h-full"
                alt="cover"
              />
            ) : (
              <span className=" m-auto text-neutral-400">cover image</span>
            )}
          </div>
          <div className=" mt-3 flex justify-between">
            <div className="flex gap-2">
              <Image
                src={currentTodo.icon}
                width={50}
                height={50}
                alt=""
                className="my-auto  cursor-pointer hover:scale-150 hover:skew-x-6 transition-all"
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              />
              <h1 className=" my-auto text-3xl font-extrabold text-neutral-500">
                {currentTodo.title}
              </h1>
            </div>
            <span
              className={`${
                isSaving
                  ? "bg-cyan-400 text-white px-3 w-fit h-fit rounded-lg"
                  : isSaved
                  ? " bg-green-400 text-white px-3 w-fit h-fit rounded-lg"
                  : ""
              }`}
            >
              {isSaving ? "saving" : isSaved ? "saved" : ""}
            </span>
          </div>
          <div className=" mt-5 absolute z-50">
            {isEmojiPickerOpen && (
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            )}
          </div>
          <div>
            <Todos todo={currentTodo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTodo;
