"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";
import { RiSearch2Fill, RiSearchLine, RiSettingsLine } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FcEmptyTrash } from "react-icons/fc";
import { AiOutlineImport } from "react-icons/ai";
import { TbTemplate } from "react-icons/tb";
import { MdGroupWork } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import AddAPage from "./shared/AddAPage";
import SidebarPages from "./shared/SidebarPages";
import SidebarUser from "./shared/UserButton";
import { getAllPages } from "@/lib/actions/page.action";
import { useSidebarContext } from "@/context/sidebarContext";
import TodoPages from "./shared/TodoPages";

const Sidebar = ({ pages, todoPages }: any) => {
  const { handleMouseDown }: any = useSidebarContext();
  return (
    <div
      onClick={handleMouseDown}
      className=" min-w-[220px] min-h-screen max-h-screen border-r-2  fixed z-50  flex flex-col bg-neutral-50 dark:bg-slate-900 gap-1 "
    >
      <SidebarUser />
      <div className=" mb-5 gap-1">
        <span className=" w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer text-sm">
          <span className=" my-auto">
            <RiSearchLine />
          </span>{" "}
          Seach
        </span>

        <span className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <FcSettings />
          </span>{" "}
          Settings and Members
        </span>

        <span className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <AiOutlinePlusCircle />
          </span>{" "}
          New Page
        </span>
      </div>

      <SidebarPages pages={pages} />
      <TodoPages todos={todoPages} />
      <AddAPage />

      <div className="text-sm flex flex-col gap-1 mt-5">
        <span className=" w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <MdGroupWork />
          </span>{" "}
          Create a teamSpace
        </span>

        <span className=" w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <TbTemplate />
          </span>{" "}
          Templates
        </span>

        <span className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <AiOutlineImport />
          </span>{" "}
          Import
        </span>

        <span className="text-sm w-full hover:bg-neutral-200 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer ">
          <span className=" my-auto">
            <FcEmptyTrash />
          </span>{" "}
          Trash
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
