"use client";
import { addPage } from "@/lib/actions/page.action";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { usePageContext } from "@/context/pageContext";
import Image from "next/image";

const SidebarTodoPage = ({ page, id }: { page: any; id: any }) => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isOptionsVisible, setisOptionsVisible] = useState(false);
  const { currentPage, setCurrentPage }: any = usePageContext();

  const handleCreateTodoPage = async (parentId: string | null) => {
    try {
      const page = await addPage({
        path: "/",
        parentPageId: parentId,
      });
      setIsParentOpen(true);
      setCurrentPage(page);
      console.log(page);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={id} className=" flex flex-col">
      <div
        onClick={() => setCurrentPage(page)}
        onMouseEnter={() => setisOptionsVisible(true)}
        onMouseLeave={() => setisOptionsVisible(false)}
        className="text-sm w-full hover:bg-neutral-200 transition-all hover:scale-105 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer"
      >
        {!isParentOpen ? (
          <span
            className=" text-[14px] font-bold"
            onClick={() => setIsParentOpen(true)}
          >
            <MdOutlineChevronRight />
          </span>
        ) : (
          <span
            className=" text-[14px] font-bold my-auto"
            onClick={() => setIsParentOpen(false)}
          >
            <IoChevronDownOutline />
          </span>
        )}
        <span>
          <Image
            src={page.icon}
            width={15}
            height={15}
            alt=""
            className="my-auto"
          />
        </span>
        <h1 className="text-sm">{page.title}</h1>
        <div
          className={` self-end ml-auto  gap-2 flex text-neutral-500 ${
            isOptionsVisible ? "" : " hidden"
          }`}
        >
          <span className=" hover:bg-neutral-300 rounded-sm">
            <BsThreeDots />
          </span>
          <span
            className=" hover:bg-neutral-300 rounded-sm"
            onClick={() => handleCreateTodoPage(page._id)}
          >
            <FaPlus />
          </span>
        </div>
      </div>
      {isParentOpen &&
        page.childPages &&
        page.childPages.length > 0 &&
        page.childPages.map((childPage: any) => {
          return (
            <div key={childPage._id} className="ml-3">
              <SidebarTodoPage page={childPage} id={childPage._id} />
            </div>
          );
        })}
    </div>
  );
};

export default SidebarTodoPage;
