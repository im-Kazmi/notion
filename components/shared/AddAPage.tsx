"use client";
import { usePageContext } from "@/context/pageContext";
import { addPage } from "@/lib/actions/page.action";
import { createTodo } from "@/lib/actions/todo.action";
import { usePathname } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddAPage = () => {
  const { currentPage, setCurrentPage }: any = usePageContext();
  const pathname = usePathname();
  const handleCreatePage = async () => {
    try {
      const page = await addPage({
        path: pathname,
      });
      setCurrentPage(page._id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateTodo = async () => {
    try {
      const todo = await createTodo();
      // setCurrentPage(page._id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        onClick={handleCreatePage}
        className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer "
      >
        <span className=" my-auto">
          <FaPlus />
        </span>
        Add a page
      </div>

      <div
        onClick={handleCreateTodo}
        className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer "
      >
        <span className=" my-auto">
          <FaPlus />
        </span>
        Add a Todo
      </div>
    </div>
  );
};

export default AddAPage;
