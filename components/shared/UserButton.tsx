/* eslint-disable react/no-unescaped-entities */
"use client";
import { UserButton, useSession, useUser } from "@clerk/nextjs";

import React from "react";

const SidebarUser = () => {
  const { user } = useUser();
  return (
    <div>
      <div className=" px-5 mt-1 mb-5 flex gap-5 h-12  hover:bg-neutral-200  py-[2px] text-neutral-600 cursor-pointer">
        <div className=" w-8 h-8 rounded-full">
          <UserButton />
        </div>
        <h1 className=" my-auto text-sm">{user?.fullName}'s Notion</h1>
      </div>
    </div>
  );
};

export default SidebarUser;
