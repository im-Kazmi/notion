"use client";

import CurrentPage from "@/components/page/CurrentPage";
import CurrentTodo from "@/components/page/CurrentTodo";
import { usePageContext } from "@/context/pageContext";

const Page = () => {
  const { currentPage, currentTodo }: any = usePageContext();

  return (
    <div className=" w-full min-h-screen justify-center flex ">
      {currentPage && <CurrentPage />}
      {currentTodo && <CurrentTodo />}
    </div>
  );
};

export default Page;
