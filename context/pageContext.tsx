"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const PageContext = createContext({});

const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState();

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
export default PageContextProvider;
