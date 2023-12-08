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
import { deleteTodo } from "@/lib/actions/todo.action";

const SidebarTodo = ({ todo: todoFromProps, id }: { todo: any; id: any }) => {
  const todo = JSON.parse(todoFromProps);
  const [isOptionsVisible, setisOptionsVisible] = useState(false);
  const { currentTodo, setCurrentTodo, setCurrentPage }: any = usePageContext();

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
        <div
          onClick={() => {
            setCurrentPage(null);
            setCurrentTodo(todo);
          }}
          className=" flex gap-3"
        >
          <span>
            <Image
              src={todo.icon}
              width={15}
              height={15}
              alt=""
              className="my-auto"
            />
          </span>
          <input
            className="text-sm border-none outline-none bg-transparent cursor-pointer disabled max-w-fit focus:cursor-text"
            value={todo.title}
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
                  onClick={() => deleteTodo({ id: todo._id })}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    const duplicatedPage = duplicatePage(todo._id);
                    setCurrentTodo(duplicatedPage);
                  }}
                >
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SidebarTodo;
