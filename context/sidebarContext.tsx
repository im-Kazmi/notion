"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const SidebarContext = createContext({});

interface Props {
  children?: ReactNode;
}
const SidebarContextProvider = ({ children }: Props) => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: any) => {
    if (isResizing) {
      const newWidth = e.clientX;
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <SidebarContext.Provider value={{ handleMouseDown }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
export default SidebarContextProvider;
