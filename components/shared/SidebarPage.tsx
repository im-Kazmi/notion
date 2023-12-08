"use client";
import { addPage, deletePage, duplicatePage } from "@/lib/actions/page.action";
import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { usePageContext } from "@/context/pageContext";
import Image from "next/image";
import { RiDraggable } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarPage = ({ page: pageFromProps, id }: { page: any; id: any }) => {
  const page = JSON.parse(pageFromProps);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isOptionsVisible, setisOptionsVisible] = useState(false);
  const { currentPage, setCurrentPage, setCurrentTodo }: any = usePageContext();
  const handleCreatePage = async (parentId: string | null) => {
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
        onMouseEnter={() => setisOptionsVisible(true)}
        onMouseLeave={() => setisOptionsVisible(false)}
        className="text-sm w-full hover:bg-neutral-200 transition-all hover:scale-105 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer"
      >
        <span className="">
          <RiDraggable />
        </span>
        {!isParentOpen ? (
          <span
            className=" text-[14px] font-bold transition-transform"
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
        <div
          onClick={() => {
            setCurrentPage(page);
            setCurrentTodo(null);
          }}
          className=" flex gap-3"
        >
          <span>
            <Image
              src={page.icon}
              width={15}
              height={15}
              alt=""
              className="my-auto"
            />
          </span>
          <input
            className="text-sm border-none outline-none bg-transparent cursor-pointer disabled max-w-fit focus:cursor-text"
            value={page.title}
          />
        </div>
        <div className={` self-end ml-auto  gap-2 flex text-neutral-500`}>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <span
                className={`outline-none hover:bg-neutral-300 rounded-sm cursor-pointer  ${
                  isOptionsVisible ? "" : "hidden"
                }`}
              >
                <BsThreeDots />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => deletePage({ id: page._id })}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const duplicatedPage = duplicatePage(page._id);
                    setCurrentPage(duplicatedPage);
                  }}
                >
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <span
            className={` hover:bg-neutral-300 rounded-sm ${
              isOptionsVisible ? "" : "hidden "
            }`}
            onClick={() => {
              handleCreatePage(page._id), setIsParentOpen(true);
            }}
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
              <SidebarPage page={childPage} id={childPage._id} />
            </div>
          );
        })}
    </div>
  );
};

export default SidebarPage;
