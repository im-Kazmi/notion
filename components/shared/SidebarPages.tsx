"use client";
import React from "react";
import SidebarPage from "./SidebarPage";
import { usePageContext } from "@/context/pageContext";

const SidebarPages = ({ pages: pagesFromProps }: any) => {
  const pages = JSON.parse(pagesFromProps);
  const { currentPage, setCurrentPage }: any = usePageContext();

  return (
    <div>
      {pages &&
        pages.length > 0 &&
        pages.map((page: any) => {
          return <SidebarPage page={page} key={page._id} id={page._id} />;
        })}
    </div>
  );
};

export default SidebarPages;
