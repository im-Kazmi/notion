"use client";
import { addPage } from "@/lib/actions/page.action";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { usePageContext } from "@/context/pageContext";
import Image from "next/image";
import PageOptionsDropdown from "../page/PageOptionsDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarPage = ({ page, id }: { page: any; id: any }) => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isOptionsVisible, setisOptionsVisible] = useState(false);
  const { currentPage, setCurrentPage }: any = usePageContext();

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
  console.log(currentPage);
  return (
    <div key={id} className=" flex flex-col">
      <div
        onMouseEnter={() => setisOptionsVisible(true)}
        onMouseLeave={() => setisOptionsVisible(false)}
        className="text-sm w-full hover:bg-neutral-200 transition-all hover:scale-105 flex gap-3 py-[2px] px-5 text-neutral-600 cursor-pointer"
      >
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
        <div onClick={() => setCurrentPage(page)} className=" flex gap-3">
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
        </div>
        <div className={` self-end ml-auto  gap-2 flex text-neutral-500`}>
          <DropdownMenu className=" flex w-full h-full  ">
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
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
