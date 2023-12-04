"use client";
import { usePageContext } from "@/context/pageContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { editPage } from "@/lib/actions/page.action";
import EmojiPicker from "emoji-picker-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { quill_formats, quill_modules } from "@/constants/quill";
const Page = () => {
  const { currentPage, setCurrentPage }: any = usePageContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => currentPage?.title);
  const [content, setContent] = useState(() => currentPage?.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setInputValue(currentPage?.title);
    setContent(currentPage?.content);
  }, [currentPage]);

  const handleInputChange = async (e: any) => {
    try {
      setInputValue(e?.target?.value);
      setTimeout(async () => {
        if (e.target.value.length === 0) {
          await editPage({
            pageId: currentPage._id,
            data: {
              title: "untitled",
            },
          });
        } else {
          await editPage({
            pageId: currentPage._id,
            data: {
              title: e.target.value,
            },
          });
        }
      }, 300);
    } catch (error) {}
  };

  const handleEmojiClick = async (emoji: any) => {
    setIsEmojiPickerOpen(false);
    try {
      const page = await editPage({
        pageId: currentPage._id,
        data: {
          icon: emoji.imageUrl,
        },
      });
      setCurrentPage(page);
    } catch (error) {}
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (content) {
        try {
          setIsSaving(true);
          await editPage({
            pageId: currentPage._id,
            data: {
              content: content,
            },
          });
          setIsSaving(false);
          setIsSaved(true);
        } catch (error) {
          setIsSaving(false);
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [content, setCurrentPage, currentPage]);

  return (
    <div className=" w-full min-h-screen justify-center flex ">
      {currentPage && (
        <div className=" w-full px-20">
          <div className=" min-w-full my-2 flex h-[150px] cursor-pointer bg-neutral-50 hover:bg-neutral-200">
            {currentPage.cover ? (
              <Image
                src={currentPage.cover}
                width={100}
                height={100}
                className=" w-full h-full"
                alt="cover"
              />
            ) : (
              <span className=" m-auto text-neutral-400">cover image</span>
            )}
          </div>
          <span className=" mt-3 flex justify-between">
            <Image
              src={currentPage.icon}
              width={50}
              height={50}
              alt=""
              className="my-auto  cursor-pointer hover:scale-150 hover:skew-x-6 transition-all"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            />

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
          </span>
          <div className=" mt-5 absolute z-50">
            {isEmojiPickerOpen && (
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            )}
          </div>
          <div className=" relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className=" border-b outline-none w-full h-16 text-4xl bg-transparent font-extrabold text-neutral-500 "
            />
            <div className=" flex w-full justify-center max-w-3xl">
              <ReactQuill
                theme="bubble"
                className=" w-full  mt-3 text-neutral-500 text-2xl transition-all"
                value={content}
                onChange={setContent}
                placeholder="Start here..."
                modules={quill_modules}
                formats={quill_formats}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
