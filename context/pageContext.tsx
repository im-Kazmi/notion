"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const PageContext = createContext({});

const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState();
  const [currentTodo, setCurrentTodo] = useState();

  const value = {
    currentPage,
    setCurrentPage,
    currentTodo,
    setCurrentTodo,
  };
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => {
  return useContext(PageContext);
};
export default PageContextProvider;
